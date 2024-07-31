import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, NotFoundException, BadRequestException, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { FundingVehiclesService } from './funding-vehicles.service';
import { CreateFundingVehicleDto } from './dto/create-funding-vehicle.dto';
import { UpdateFundingVehicleDto } from './dto/update-funding-vehicle.dto';
import throwInternalServer from 'src/shared/utils/exceptions.util';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('funding-vehicles')
export class FundingVehiclesController {
  constructor(private readonly fundingVehiclesService: FundingVehiclesService) {}

  @Post()
  @Roles(Role.Admin)
  create(@Body() createFundingVehicleDto: CreateFundingVehicleDto) {
    try {
      return this.fundingVehiclesService.create(createFundingVehicleDto);
    } catch (error) {
      throwInternalServer(error)
    }
  }

  @Get()
  findAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.fundingVehiclesService.findAll(page , limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.fundingVehiclesService.findOne(+id);
    } catch (error) {
      throwInternalServer(error)
    }
  }

  @Put(':id')
  @Roles(Role.Admin)
  async update(@Param('id') id: string, @Body() updateFundingVehicleDto: UpdateFundingVehicleDto) {
    try {
      await this.fundingVehiclesService.findOne(+id);
      const funding = await this.fundingVehiclesService.update(+id, updateFundingVehicleDto);
      return funding;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new BadRequestException(`Funding vehicle with id ${id} not found`);
      }
      throwInternalServer(error)
    }
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    try {
      await this.fundingVehiclesService.remove(+id);
    } catch (error) {
      throwInternalServer(error)
    }
  }
}
