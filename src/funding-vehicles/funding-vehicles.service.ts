import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFundingVehicleDto } from './dto/create-funding-vehicle.dto';
import { UpdateFundingVehicleDto } from './dto/update-funding-vehicle.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FundingVehicle } from './entities/funding-vehicle.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FundingVehiclesService {
  constructor(
    @InjectRepository(FundingVehicle)
    private fundingVehicleRepository: Repository<FundingVehicle>,
  ) {}
  async create(createFundingVehicleDto: CreateFundingVehicleDto) {
    return await this.fundingVehicleRepository.save(createFundingVehicleDto);
  }

  findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    return this.fundingVehicleRepository.find({
      skip,
      take: limit,
    });
  }

  async findOne(id: number) {
    const funding = await this.fundingVehicleRepository.findOneBy({ id });
    if (!funding) {
      throw new NotFoundException(`Funding vehicle with id ${id} not found`);
    }
    return funding;
  }

  async update(id: number, updateFundingVehicleDto: UpdateFundingVehicleDto) {
    const { title, description } = updateFundingVehicleDto;
    const updates = {};
    if (title) updates['title'] = title;
    if (description) updates['description'] = description;
    if (Object.keys(updates).length > 0) await this.fundingVehicleRepository.update(id, updateFundingVehicleDto);
    return this.fundingVehicleRepository.findOneBy({ id });
  }

  remove(id: number) {
    this.fundingVehicleRepository.delete(id);
  }
}
