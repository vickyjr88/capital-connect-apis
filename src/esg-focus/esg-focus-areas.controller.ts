import { Controller, Get, Post, Body, Param, Delete, UseGuards, Query, NotFoundException, BadRequestException, HttpCode, HttpStatus, Put } from '@nestjs/common';
import { EsgFocusAreasService } from './esg-focus-areas.service';
import { CreateEsgFocusAreaDto } from './dto/create-esg-focus-area.dto';
import { UpdateEsgFocusAreaDto } from './dto/update-esg-focus-area.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import throwInternalServer from 'src/shared/utils/exceptions.util';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('esg-focus')
export class EsgFocusAreasController{
  constructor(private readonly esgFocusAreasService: EsgFocusAreasService) {}

  @Post()
  @Roles(Role.Admin)
  create(@Body() createEsgFocusAreaDto: CreateEsgFocusAreaDto) {
    try {
      return this.esgFocusAreasService.create(createEsgFocusAreaDto);
    } catch (error) {
      throwInternalServer(error)
    }
  }

  @Get()
  findAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.esgFocusAreasService.findAll(page , limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.esgFocusAreasService.findOne(+id);
    } catch (error) {
      throwInternalServer(error)
    }
  }

  @Put(':id')
  @Roles(Role.Admin)
  async update(@Param('id') id: string, @Body() updateEsgFocusAreaDto: UpdateEsgFocusAreaDto) {
    try {
      await this.esgFocusAreasService.findOne(+id);
      const esg = await this.esgFocusAreasService.update(+id, updateEsgFocusAreaDto);
      return esg;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new BadRequestException(`ESG focus area with id ${id} not found`);
      }
      throwInternalServer(error)
    }
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    try {
      await this.esgFocusAreasService.remove(+id);
    } catch (error) {
      throwInternalServer(error)
    }
  }
}
