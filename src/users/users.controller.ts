import { BadRequestException, Body, Controller, Get, Param, Put, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

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
  
    @UseGuards(JwtAuthGuard)
    @Get()
    getAllUsers() {
      return this.userService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
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
