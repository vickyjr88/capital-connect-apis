import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put, BadRequestException, HttpCode, Query } from '@nestjs/common';
import { SectionService } from './section.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('sections')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createSectionDto: CreateSectionDto) {
    return this.sectionService.create(createSectionDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.sectionService.findAll(page, limit);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sectionService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
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
