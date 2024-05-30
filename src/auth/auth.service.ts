import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/entities/user.entity';

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

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(user: Partial<User>) {
    const isEmailValid = this.usersService.validateEmail(user.username);
    if (!isEmailValid) {
      throw new BadRequestException('Invalid email format');
    }
    const isUsernameTaken = await this.usersService.isUsernameTaken(user.username);
    const hash = await bcrypt.hash(user.password, 10);
    if (isUsernameTaken) {
      throw new BadRequestException('Username is already taken');
    }
    user.password = hash;
    return this.usersService.create(user);
  }
}
