import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';
import { addHours } from 'date-fns';
import * as nodemailer from 'nodemailer';
import * as sgMail from '@sendgrid/mail';
const brevo = require('@getbrevo/brevo');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(id: number): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async isUsernameTaken(username: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({ where: { username } });
    return !!user;
  }

  async create(user: Partial<User>): Promise<User> {
    const usr = await this.usersRepository.create(user);
    return this.usersRepository.save(usr);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
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
    delete updateUserDto.roles;
    await this.usersRepository.update(id, updateUserDto);
    return this.usersRepository.findOneBy({ id });
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async requestPasswordReset(email: string): Promise<void> {
    try {
      const user = await this.usersRepository.findOne({ where: { username: email } });
      if (!user) {
        throw new NotFoundException('User not found');
      }
  
      user.resetPasswordToken = randomBytes(32).toString('hex');
      user.resetPasswordExpires = addHours(new Date(), 1); // Token valid for 1 hour
  
      await this.usersRepository.save(user);

      const msg = {
        to: user.username,
        from: process.env.FROM_EMAIL,
        subject: 'Password Reset',
        text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n` +
          `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
          `${process.env.FRONTEND_URL}/reset-password/${user.resetPasswordToken}\n\n` +
          `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
      };
  
      // await this.sendResetEmail(user);
      await this.sendResetEmailViaBrevo(msg, user);
      // await this.sendResetEmailSendGrid(user);
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { resetPasswordToken: token } });
    if (!user || user.resetPasswordExpires < new Date()) {
      throw new BadRequestException('Invalid or expired token');
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await this.usersRepository.save(user);
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
        `${process.env.FRONTEND_URL}/reset-password/${user.resetPasswordToken}\n\n` +
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
        `${process.env.FRONTEND_URL}/reset-password/${user.resetPasswordToken}\n\n` +
        `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };
  
    await sgMail.send(msg);
  }

  async sendResetEmailViaBrevo(msg: any, user: User){
    let apiInstance = new brevo.TransactionalEmailsApi();

    let apiKey = apiInstance.authentications['apiKey'];
    apiKey.apiKey = process.env.BREVO_API_KEY;

    let sendSmtpEmail = new brevo.SendSmtpEmail();

    sendSmtpEmail.subject = msg.subject;
    sendSmtpEmail.htmlContent = `<html><body><h1>Follow instructions below to reset your password</h1><p>${msg.text}</p></body></html>`;
    sendSmtpEmail.sender = { "name": "Capital Connect", "email": process.env.FROM_EMAIL };
    sendSmtpEmail.to = [
      { "email": msg.to, "name": `${user.firstName} ${user.lastName}` }
    ];
    sendSmtpEmail.replyTo = { "name": "Capital Connect", "email": process.env.FROM_EMAIL };
    // sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
    // sendSmtpEmail.params = { "parameter": "My param value", "subject": "common subject" };


    apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
      console.log('API called successfully. Returned data: ' + JSON.stringify(data));
    }, function (error) {
      console.error(error);
    });
  }

  async verifyEmail(token: string): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { emailVerificationToken: token } });
    if (!user || user.emailVerificationExpires < new Date()) {
      throw new BadRequestException('Invalid or expired token');
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = null;
    user.emailVerificationExpires = null;

    try {
      await this.usersRepository.save(user);
    } catch (error) {
      throw error;
    }
  }

  async acceptTerms(userId: number): Promise<void> {
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (user) {
      user.hasAcceptedTerms = true;
      user.termsAcceptedAt = new Date();
      await this.usersRepository.save(user);
    }
  }
}
