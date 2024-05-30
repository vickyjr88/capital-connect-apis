import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubsectionService } from './subsection.service';
import { CreateSubsectionDto } from './dto/create-subsection.dto';
import { UpdateSubsectionDto } from './dto/update-subsection.dto';

@Controller('subsection')
export class SubsectionController {
  constructor(private readonly subsectionService: SubsectionService) {}

  @Post()
  create(@Body() createSubsectionDto: CreateSubsectionDto) {
    return this.subsectionService.create(createSubsectionDto);
  }

  @Get()
  findAll() {
    return this.subsectionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subsectionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubsectionDto: UpdateSubsectionDto) {
    return this.subsectionService.update(+id, updateSubsectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subsectionService.remove(+id);
  }
}
