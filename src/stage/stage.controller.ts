import { Controller, Get, Post, Body, Patch, Param, Delete, Put, NotFoundException, BadRequestException, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { StageService } from './stage.service';
import { CreateStageDto } from './dto/create-stage.dto';
import { UpdateStageDto } from './dto/update-stage.dto';
import throwInternalServer from 'src/shared/utils/exceptions.util';

@Controller('stage')
export class StageController {
  constructor(private readonly stageService: StageService) {}

  @Post()
  create(@Body() createStageDto: CreateStageDto) {
    try {
      return this.stageService.create(createStageDto);
    } catch (error) {
      throwInternalServer(error)
    }
  }

  @Get()
  findAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.stageService.findAll(page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.stageService.findOne(+id);
    } catch (error) {
      throwInternalServer(error)
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateStageDto: UpdateStageDto) {
    try {
      await this.stageService.findOne(+id);
      const stage = await this.stageService.update(+id, updateStageDto);
      return stage;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new BadRequestException(`Stage of business with id ${id} not found`);
      }
      throwInternalServer(error)
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    try {
      await this.stageService.remove(+id);
    } catch (error) {
      throwInternalServer(error)
    }
  }
}
