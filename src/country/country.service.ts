import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from './entities/country.entity';
import { CreateCountryDto } from './dto/create-country.dto';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private countriesRepository: Repository<Country>,
  ) {}

  async findAll(): Promise<Country[]> {
    return this.countriesRepository.find();
  }

  async create(country: CreateCountryDto): Promise<Country> {
    return this.countriesRepository.save(country);
  }

  async bulkCreate(countries: CreateCountryDto[]): Promise<Country[]> {
    return this.countriesRepository.save(countries);
  }
}
