import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  NotFoundException,
  BadRequestException,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { CreateMobileNumberDto } from './dto/create-mobile-number.dto';
import { UpdateMobileNumberDto } from './dto/update-mobile-number.dto';
import throwInternalServer from 'src/shared/utils/exceptions.util';
import { MobileNumberService } from './mobile-number.service';

@Controller('mobile-numbers')
export class MobileNumberController {
  constructor(private readonly mobileService: MobileNumberService) {}

  @Post()
  async create(@Body() createMobileDto: CreateMobileNumberDto) {
    try {
      return await this.mobileService.create(createMobileDto);
    } catch (error) {
      throwInternalServer(error);
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
      throwInternalServer(error);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMobileDto: UpdateMobileNumberDto,
  ) {
    try {
      await this.mobileService.findOne(+id);
      const mobile = await this.mobileService.update(+id, updateMobileDto);
      return mobile;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new BadRequestException(`Mobile with id ${id} not found`);
      }
      throwInternalServer(error);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    try {
      await this.mobileService.remove(+id);
    } catch (error) {
      throwInternalServer(error);
    }
  }
}
