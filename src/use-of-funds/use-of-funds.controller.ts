import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Put, NotFoundException, BadRequestException, HttpCode, HttpStatus } from '@nestjs/common';
import { UseOfFundsService } from './use-of-funds.service';
import { CreateUseOfFundsDto } from './dto/create-use-of-funds.dto';
import { UpdateUseOfFundsDto } from './dto/update-use-of-fund.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import throwInternalServer from 'src/shared/utils/exceptions.util';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('use-funds')
export class UseOfFundsController {
  constructor(private readonly useOfFundsService: UseOfFundsService) {}

  @Post()
  @Roles(Role.Admin)
  create(@Body() createUseOfFundsDto: CreateUseOfFundsDto) {
    try {
      return this.useOfFundsService.create(createUseOfFundsDto);
    } catch (error) {
      throwInternalServer(error)
    }
  }

  @Get()
  findAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.useOfFundsService.findAll(page , limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.useOfFundsService.findOne(+id);
    } catch (error) {
      throwInternalServer(error)
    }
  }

  @Put(':id')
  @Roles(Role.Admin)
  async update(@Param('id') id: string, @Body() updateUseOfFundsDto: UpdateUseOfFundsDto) {
    try {
      await this.useOfFundsService.findOne(+id);
      const fundsUse = await this.useOfFundsService.update(+id, updateUseOfFundsDto);
      return fundsUse;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new BadRequestException(`Use of funds with id ${id} not found`);
      }
      throwInternalServer(error)
    }
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    try {
      await this.useOfFundsService.remove(+id);
    } catch (error) {
      throwInternalServer(error)
    }
  }
}
