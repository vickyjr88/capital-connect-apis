import { Controller, Get, Request, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Request() req) {
    const { username, password } = req.body;
    try {
      return await this.authService.login(username, password);
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw new BadRequestException(error.message);
        }
        throw error;
    }
  }

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.authService.signup(createUserDto);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }
}
