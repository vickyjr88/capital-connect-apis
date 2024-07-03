import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put, BadRequestException, HttpCode, Query, HttpStatus, NotFoundException } from '@nestjs/common';
import { SectorService } from './sector.service';
import { CreateSectorDto } from './dto/create-sector.dto';
import { UpdateSectorDto } from './dto/update-sector.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { RolesGuard } from 'src/auth/roles.guard';
import throwInternalServer from 'src/shared/utils/exceptions.util';
import { SubSectorService } from 'src/subsector/subsector.service';

@Controller('sectors')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SectorController {
  constructor(
    private readonly sectorService: SectorService,
    private readonly subSectorsService: SubSectorService
  ) {}

  @Post()
  @Roles(Role.Admin)
  create(@Body() createSectorDto: CreateSectorDto) {
    try {
      return this.sectorService.create(createSectorDto);
    } catch (error) {
      throwInternalServer(error)
    }
  }

  @Get()
  findAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.sectorService.findAll(page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.sectorService.findOne(+id);
    } catch (error) {
      throwInternalServer(error)
    }
  }

  @Put(':id')
  @Roles(Role.Admin)
  async update(@Param('id') id: string, @Body() updateSectorDto: UpdateSectorDto) {
    try {
      await this.sectorService.findOne(+id);
      const sector = await this.sectorService.update(+id, updateSectorDto);
      return sector;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new BadRequestException(`Sector with id ${id} not found`);
      }
      throwInternalServer(error)
    }
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    try {
      await this.sectorService.remove(+id);
    } catch (error) {
      throwInternalServer(error)
    }
  }

  @Get(':id/subsectors')
  async findSubsections(@Param('id') id: string) {
    try {
      return await this.subSectorsService.findSubsections(+id);
    } catch (error) {
      throwInternalServer(error)
    }
  }
}
