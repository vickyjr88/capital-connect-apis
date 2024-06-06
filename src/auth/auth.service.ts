import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/entities/user.entity';
import { Role } from './role.enum';

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
    return this.usersService.create(user);
  }
}
