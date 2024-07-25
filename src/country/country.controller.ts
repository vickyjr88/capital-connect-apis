import { Controller, Get, Post, Body, Delete, Param, Put, NotFoundException, BadRequestException } from '@nestjs/common';
import { CountryService } from './country.service';
import { Country } from './entities/country.entity';
import { CreateCountryDto } from './dto/create-country.dto';
import * as countriesData from './countries.json' // Create a JSON file with country data
import { UpdateCountryDto } from './dto/update-country.dto';
import throwInternalServer from 'src/shared/utils/exceptions.util';

@Controller('countries')
export class CountryController {
  constructor(private readonly countriesService: CountryService) {}

  @Get()
  async findAll(): Promise<Country[]> {
    return this.countriesService.findAll();
  }

  @Post('bulk')
  async bulkCreate(@Body() countries: Country[]): Promise<Country[]> {
    return this.countriesService.bulkCreate(countries);
  }

  @Get('bulklocal')
  async bulkCreateLocal(): Promise<Country[]> {
    const countries: CreateCountryDto[] = countriesData.map((country) => ({
      name: country.name,
      code: country.code,
    }));

    return await this.countriesService.bulkCreate(countries);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Country> {
    return this.countriesService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCountryDto: UpdateCountryDto) {
    try {
      await this.countriesService.findOne(+id);
      const country = await this.countriesService.update(+id, updateCountryDto);
      return country;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new BadRequestException(`Country with id ${id} not found`);
      }
      throwInternalServer(error);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    try {
      return this.countriesService.remove(id);
    } catch (error) {
      throwInternalServer(error);
    }
  }
}
