import { BadRequestException, Body, Controller, Get, Param, Put, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { UpdateUserAdminDto } from './dto/update-user-admin.dto';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Request() req) {
      const user = await this.userService.findOne(req.user.id);
      delete user.password;
      return user;
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
          throw error;
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
          throw error;
        }
        
    }
}
