import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/entities/user.entity';
import { Role } from './role.enum';
import * as sgMail from '@sendgrid/mail';
import { randomBytes } from 'crypto';
import { addHours } from 'date-fns';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

async login(username: string, password: string) {
  if (!username || !password) {
    throw new BadRequestException('Username and password are required');
  }

  const user = await this.validateUser(username, password);
  if (user) {
      const userRoles = user.roles?.split(",").map(role => role.trim());
      const payload = { username: user.username, sub: user.id, roles: userRoles || [Role.User]};
      return {
          access_token: this.jwtService.sign(payload),
      };
  }
  throw new BadRequestException('Invalid username or password');
}

  async signup(user: Partial<User>) {
    const isEmailValid = this.usersService.validateEmail(user.username);
    if (!isEmailValid) {
      throw new BadRequestException('Invalid email format');
    }
    const isUsernameTaken = await this.usersService.isUsernameTaken(user.username);
    if (isUsernameTaken) {
      throw new BadRequestException('Username is already taken');
    }
    if (user.roles && [Role.Advisor, Role.Investor, Role.User].indexOf(user.roles as Role) === -1) {
      throw new BadRequestException('Invalid role');
    }
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
    user.emailVerificationToken = randomBytes(32).toString('hex');
    user.emailVerificationExpires = addHours(new Date(), 24);
    return this.usersService.create(user);
  }

  async sendVerificationEmail(user: User) {
    const verificationUrl = `http://${process.env.FRONTEND_URL}/verify-email/?token=${user.emailVerificationToken}`;
    const msg = {
      to: user.username,
      from: process.env.FROM_EMAIL, // Use your verified sender
      subject: 'Email Verification',
      text: `You are receiving this email because you (or someone else) have signed up for an account.\n\n` +
            `Please click on the following link, or paste this into your browser to complete the verification process:\n\n` +
            `${verificationUrl}\n\n` +
            `If you did not request this, please ignore this email.\n`,
    };

    await sgMail.send(msg);
  }
}
