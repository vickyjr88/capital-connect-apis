import { Injectable } from '@nestjs/common';
import { CreateFundingDto } from './dto/create-funding.dto';
import { UpdateFundingDto } from './dto/update-funding.dto';
import { Funding } from './entities/funding.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FundingService {
  constructor( 
    @InjectRepository(Funding)
    private fundingsRepository: Repository<Funding>,
  ) {}

  async create(createFundingDto: CreateFundingDto) {
    const funding = await this.fundingsRepository.save(createFundingDto)
    return funding;
  }

  async findAll(): Promise<Funding[]> {
    return this.fundingsRepository.find();
  }

 /* findOne(id: number) {
    return `This action returns a #${id} funding`;
  }

  update(id: number, updateFundingDto: UpdateFundingDto) {
    return `This action updates a #${id} funding`;
  }

  remove(id: number) {
    return `This action removes a #${id} funding`;
  } */
}
