import { Controller, Get, Post, Body, Param, Delete, Put, NotFoundException, BadRequestException, HttpCode, HttpStatus, Query, UseGuards,} from '@nestjs/common';
import { StageService } from './stage.service';
import { CreateStageDto } from './dto/create-stage.dto';
import { UpdateStageDto } from './dto/update-stage.dto';
import throwInternalServer from 'src/shared/utils/exceptions.util';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';

@Controller('stages')
@UseGuards(JwtAuthGuard, RolesGuard)
export class StageController {
  constructor(private readonly stageService: StageService) {}

  @Post()
  @Roles(Role.Admin)
  create(@Body() createStageDto: CreateStageDto) {
    try {
      return this.stageService.create(createStageDto);
    } catch (error) {
      throwInternalServer(error);
    }
  }

  @Get()
  async findAll(@Query('page') page: number, @Query('limit') limit: number) {
    try {
      const stages = await this.stageService.findAll(page, limit);
      return stages;
    } catch (error) {
      throwInternalServer(error)
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.stageService.findOne(+id);
    } catch (error) {
      throwInternalServer(error);
    }
  }

  @Put(':id')
  @Roles(Role.Admin)
  async update(
    @Param('id') id: string,
    @Body() updateStageDto: UpdateStageDto) {
    try {
      await this.stageService.findOne(+id);
      const stage = await this.stageService.update(+id, updateStageDto);
      return stage;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new BadRequestException(`Stage of business with id ${id} not found`);
      }
      throwInternalServer(error);
    }
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    try {
      await this.stageService.remove(+id);
    } catch (error) {
      throwInternalServer(error);
    }
  }
}
