import { BadRequestException, Body, Controller, Get, Param, Post, Put, Query, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { UpdateUserAdminDto } from './dto/update-user-admin.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { RequestResetPasswordDto } from './dto/request-reset-password.dto';
import throwInternalServer from 'src/shared/utils/exceptions.util';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Request() req) {
      console.log('ECHOOO: ', req.user);
      const user = await this.userService.findOne(req.user.id);
      const { resetPasswordToken, resetPasswordExpires, isEmailVerified, emailVerificationToken, emailVerificationExpires, password, ...rest } = user;
      return rest;
    }
  
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    @Roles(Role.Admin)
    getAllUsers() {
      return this.userService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    @Roles(Role.Admin, Role.Investor, Role.User)
    async updateUser(@Request() req, @Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        try {
          if (+id !== req.user.id) return new UnauthorizedException("You are not authorized to update this user.");
          return await this.userService.update(+id, updateUserDto);
        } catch (error) {
          if (error instanceof BadRequestException) {
            throw new BadRequestException(error.message);
          }
          throwInternalServer(error)
        }
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id/admin')
    @Roles(Role.Admin)
    async updateUserByAdmin(@Param('id') id: string, @Body() updateUserDto: UpdateUserAdminDto) {
        try {
          return await this.userService.update(+id, updateUserDto);
        } catch (error) {
        if (error instanceof BadRequestException) {
          throw new BadRequestException(error.message);
        }
        throwInternalServer(error)
        }
        
    }

  @Post('request-password-reset')
  async requestPasswordReset(@Body() requestResetPasswordDto: RequestResetPasswordDto): Promise<void> {
    try {
      await this.userService.requestPasswordReset(requestResetPasswordDto.email);
    } catch (error) {
      throwInternalServer(error)
    }
  }

  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto): Promise<void> {
    if (resetPasswordDto.newPassword !== resetPasswordDto.confirmNewPassword) {
      throw new BadRequestException('Passwords do not match');
    }
    try {
      await this.userService.resetPassword(resetPasswordDto.token, resetPasswordDto.newPassword);
    } catch (error) {
      throwInternalServer(error)
    }
  }

  @Get('verify-email')
  async verifyEmail(@Query('token') token: string): Promise<void> {
    if (!token) {
      throw new BadRequestException('Token is required');
    }
    try {
      await this.userService.verifyEmail(token);
    } catch (error) {
      throwInternalServer(error)
    }
  }
}
