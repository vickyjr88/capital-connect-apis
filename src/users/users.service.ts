import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';
import { addHours } from 'date-fns';
import * as nodemailer from 'nodemailer';
import * as sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOne(id: number): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }

  async isUsernameTaken(username: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { username } });
    return !!user;
  }

  async create(user: Partial<User>): Promise<User> {
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async update(id: number, updateUserDto: Partial<User>): Promise<User> {
    if (updateUserDto.username) {
      const isEmailValid = this.validateEmail(updateUserDto.username);
      if (!isEmailValid) {
        throw new BadRequestException('Invalid email format');
      }
      const isUsernameTaken = await this.isUsernameTaken(updateUserDto.username);
      if (isUsernameTaken) {
        throw new BadRequestException('Username is already taken');
      }
    }
    if (updateUserDto.password) {
      const hash = await bcrypt.hash(updateUserDto.password, 10);
      updateUserDto.password = hash;
    }
    await this.userRepository.update(id, updateUserDto);
    return this.userRepository.findOneBy({ id });
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async requestPasswordReset(email: string): Promise<void> {
    try {
      const user = await this.userRepository.findOne({ where: { username: email } });
      if (!user) {
        throw new NotFoundException('User not found');
      }
  
      user.resetPasswordToken = randomBytes(32).toString('hex');
      user.resetPasswordExpires = addHours(new Date(), 1); // Token valid for 1 hour
  
      await this.userRepository.save(user);
  
      // await this.sendResetEmail(user);
      await this.sendResetEmailSendGrid(user);
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { resetPasswordToken: token } });
    if (!user || user.resetPasswordExpires < new Date()) {
      throw new BadRequestException('Invalid or expired token');
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await this.userRepository.save(user);
  }

  private async sendResetEmail(user: User) {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    console.log("Auth", {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    })

    const mailOptions = {
      to: user.username,
      from: process.env.GMAIL_USER,
      subject: 'Password Reset',
      text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n` +
        `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
        `http://${process.env.FRONTEND_URL}/reset-password/${user.resetPasswordToken}\n\n` +
        `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    await transporter.sendMail(mailOptions);
  }

  private async sendResetEmailSendGrid(user: User) {
    const msg = {
      to: user.username,
      from: process.env.FROM_EMAIL,
      subject: 'Password Reset',
      text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n` +
        `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
        `http://${process.env.FRONTEND_URL}/reset-password/${user.resetPasswordToken}\n\n` +
        `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };
  
    await sgMail.send(msg);
  }

  async verifyEmail(token: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { emailVerificationToken: token } });
    if (!user || user.emailVerificationExpires < new Date()) {
      throw new BadRequestException('Invalid or expired token');
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = null;
    user.emailVerificationExpires = null;

    try {
      await this.userRepository.save(user);
    } catch (error) {
      throw error;
    }
  }
}
