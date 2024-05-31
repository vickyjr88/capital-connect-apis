import { Controller, Get, Post, Body, Param, Delete, UseGuards, BadRequestException, Put, HttpCode, Query } from '@nestjs/common';
import { SubsectionService } from './subsection.service';
import { CreateSubsectionDto } from './dto/create-subsection.dto';
import { UpdateSubsectionDto } from './dto/update-subsection.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('subsections')
export class SubsectionController {
  constructor(private readonly subsectionService: SubsectionService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createSubsectionDto: CreateSubsectionDto) {
    return this.subsectionService.create(createSubsectionDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query('page') page: number, @Query('limit') limit: number){
    try {
      const subsections = await this.subsectionService.findAll(page, limit);
      return subsections;
    } catch (error) {
      console.log(error);
      throw new BadRequestException("Something went wrong.");
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subsectionService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateSubsectionDto: UpdateSubsectionDto) {
    try {
      if (updateSubsectionDto.name === "" || updateSubsectionDto.name === undefined) 
        return new BadRequestException("Name cannot be empty.")
      return this.subsectionService.update(+id, updateSubsectionDto);
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
      await this.subsectionService.remove(+id);
    } catch (error) {
      console.log(error)
      return new BadRequestException("Something went wrong.")
    }
  }
}
