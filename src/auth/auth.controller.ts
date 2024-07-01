import { Controller, Request, Post, Body, BadRequestException, NotFoundException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import throwInternalServer from 'src/shared/utils/exceptions.util';
import { ResendVerificationEmailDto } from './dto/resend-verification-email.dto';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService
  ) {}

  @Post('login')
  async login(@Request() req) {
    const { username, password } = req.body;

    try {
      return await this.authService.login(username, password);
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw new BadRequestException(error.message);
        }
        throwInternalServer(error)
    }
  }

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.authService.signup(createUserDto);
      await this.authService.sendVerificationEmail(user);
      return user;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      throwInternalServer(error)
    }
  }

  @Post('resend-verification-email')
  async requestPasswordReset(@Body() resendVerificationEmailDto: ResendVerificationEmailDto) {
    try {
      const user = await this.userService.findByUsername(resendVerificationEmailDto.email);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      await this.authService.sendVerificationEmail(user);
      return { message: 'Email verification email sent' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throwInternalServer(error)
    }
  }
}
