import { Controller, Get, Post, Body, Param, Delete, UseGuards, Query, NotFoundException, BadRequestException, HttpCode, HttpStatus, Put } from '@nestjs/common';
import { RegistrationStructuresService } from './registration-structures.service';
import { CreateRegistrationStructureDto } from './dto/create-registration-structure.dto';
import { UpdateRegistrationStructureDto } from './dto/update-registration-structure.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import throwInternalServer from 'src/shared/utils/exceptions.util';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('registration-structures')
export class RegistrationStructuresController {
  constructor(private readonly registrationStructuresService: RegistrationStructuresService) {}

  @Post()
  @Roles(Role.Admin)
  create(@Body() createRegistrationStructureDto: CreateRegistrationStructureDto) {
    try {
      return this.registrationStructuresService.create(createRegistrationStructureDto);
    } catch (error) {
      throwInternalServer(error)
    }
  }

  @Get()
  findAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.registrationStructuresService.findAll(page , limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.registrationStructuresService.findOne(+id);
    } catch (error) {
      throwInternalServer(error)
    }
  }

  @Put(':id')
  @Roles(Role.Admin)
  async update(@Param('id') id: string, @Body() updateRegistrationStructureDto: UpdateRegistrationStructureDto) {
    try {
      await this.registrationStructuresService.findOne(+id);
      const funding = await this.registrationStructuresService.update(+id, updateRegistrationStructureDto);
      return funding;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new BadRequestException(`Registration Structure with id ${id} not found`);
      }
      throwInternalServer(error)
    }
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    try {
      await this.registrationStructuresService.remove(+id);
    } catch (error) {
      throwInternalServer(error)
    }
  }
}
