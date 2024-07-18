import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMobileDto } from './dto/create-mobile.dto';
import { UpdateMobileDto } from './dto/update-mobile.dto';
import { Mobile } from './entities/mobile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MobileService {
  constructor( 
    @InjectRepository(Mobile)
    private mobileRepository: Repository<Mobile>,
  ) {}

  async create(createMobileDto: CreateMobileDto) {
    const mobile = await this.mobileRepository.save(createMobileDto)
    return mobile;
  }

  findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    return this.mobileRepository.find({
      skip,
      take: limit,
    });
  }

  async findOne(id: number) {
    const mobile = await this.mobileRepository.findOneBy({ id });
    if (!mobile) {
      throw new NotFoundException(`Mobile with id ${id} not found`);
    }
    return mobile;
  }

  async update(id: number, updateMobileDto: UpdateMobileDto) {
    const { phoneNo, isVerified } = updateMobileDto;
    const updates = {};
    if (phoneNo) updates['phoneNo'] = phoneNo;
    if (isVerified) updates['isVerified'] = isVerified;
    if (Object.keys(updates).length > 0) await this.mobileRepository.update(id, updateMobileDto);
    return this.mobileRepository.findOneBy({ id });
  }

  remove(id: number) {
    this.mobileRepository.delete(id);
  }
}
