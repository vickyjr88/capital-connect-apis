import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInvestorProfileDto } from './dto/create-investor-profile.dto';
import { UpdateInvestorProfileDto } from './dto/update-investor-profile.dto';
import { InvestorProfile } from './entities/investor-profile.entity';
import { User } from '../users/entities/user.entity';

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
    const user = { id: createInvestorProfileDto.userId } as User;
    return this.investorProfileRepository.save({ ...investorProfile, user });
  }

  findAll(): Promise<InvestorProfile[]> {
    return this.investorProfileRepository.find();
  }

  findOne(id: number): Promise<InvestorProfile> {
    return this.investorProfileRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async update(
    id: number,
    updateInvestorProfileDto: UpdateInvestorProfileDto,
  ): Promise<InvestorProfile> {
    await this.investorProfileRepository.update(id, updateInvestorProfileDto);
    const investorProfile = await this.findOne(id);
    if (!investorProfile) {
      throw new NotFoundException('Investor profile not found');
    }
    return investorProfile;
  }

  remove(id: number): Promise<void> {
    return this.investorProfileRepository.delete(id).then(() => {});
  }
}
