import { Controller, Get, Post, Body, Param, Delete, Put, NotFoundException, BadRequestException, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { MobileService } from './mobile.service';
import { CreateMobileDto } from './dto/create-mobile.dto';
import { UpdateMobileDto } from './dto/update-mobile.dto';
import throwInternalServer from 'src/shared/utils/exceptions.util';

@Controller('mobile')
export class MobileController {
  constructor(private readonly mobileService: MobileService) {}

  @Post()
  create(@Body() createMobileDto: CreateMobileDto) {
    try {
      return this.mobileService.create(createMobileDto);
    } catch (error) {
      throwInternalServer(error)
    }
  }

  @Get()
  findAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.mobileService.findAll(page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.mobileService.findOne(+id);
    } catch (error) {
      throwInternalServer(error)
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateMobileDto: UpdateMobileDto) {
    try {
      await this.mobileService.findOne(+id);
      const mobile = await this.mobileService.update(+id, updateMobileDto);
      return mobile;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new BadRequestException(`Mobile with id ${id} not found`);
      }
      throwInternalServer(error)
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    try {
      await this.mobileService.remove(+id);
    } catch (error) {
      throwInternalServer(error)
    }
}
}
