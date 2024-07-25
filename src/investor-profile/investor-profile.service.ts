import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInvestorProfileDto } from './dto/create-investor-profile.dto';
import { UpdateInvestorProfileDto } from './dto/update-investor-profile.dto';
import { InvestorProfile } from './entities/investor-profile.entity';

@Injectable()
export class InvestorProfileService {
  constructor(
    @InjectRepository(InvestorProfile)
    private investorProfileRepository: Repository<InvestorProfile>,
  ) {}

  create(
    createInvestorProfileDto: CreateInvestorProfileDto,
  ): Promise<InvestorProfile> {
    const investorProfile = this.investorProfileRepository.create(
      createInvestorProfileDto,
    );
    return this.investorProfileRepository.save(investorProfile);
  }

  findAll(): Promise<InvestorProfile[]> {
    return this.investorProfileRepository.find();
  }

  findOne(id: number): Promise<InvestorProfile> {
    return this.investorProfileRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateInvestorProfileDto: UpdateInvestorProfileDto,
  ): Promise<InvestorProfile> {
    await this.investorProfileRepository.update(id, updateInvestorProfileDto);
    return this.findOne(id);
  }

  remove(id: number): Promise<void> {
    return this.investorProfileRepository.delete(id).then(() => {});
  }
}
