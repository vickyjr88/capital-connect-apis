import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put, BadRequestException, HttpCode, Query } from '@nestjs/common';
import { SectionService } from './section.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('sections')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin)
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @Post()
  create(@Body() createSectionDto: CreateSectionDto) {
    return this.sectionService.create(createSectionDto);
  }

  @Get()
  findAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.sectionService.findAll(page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sectionService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateSectionDto: UpdateSectionDto) {
    try {
      if (updateSectionDto.name === "" || updateSectionDto.name === undefined) 
        return new BadRequestException("Name cannot be empty.")
      return this.sectionService.update(+id, updateSectionDto);
    }
    catch (error) {
      console.log(error)
      return new BadRequestException("Something went wrong.")
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    try {
      await this.sectionService.remove(+id);
    } catch (error) {
      console.log(error)
      return new BadRequestException("Something went wrong.")
    }
  }
}
