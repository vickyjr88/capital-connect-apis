import { Controller, Get, Post, Body } from '@nestjs/common';
import { CountryService } from './country.service';
import { Country } from './entities/country.entity';
import { CreateCountryDto } from './dto/create-country.dto';
import * as countriesData from './countries.json' // Create a JSON file with country data

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
    const countries: CreateCountryDto[] = countriesData.map(country => ({
      name: country.name,
      code: country.code,
    }));
  
    return await this.countriesService.bulkCreate(countries);
  }
}
