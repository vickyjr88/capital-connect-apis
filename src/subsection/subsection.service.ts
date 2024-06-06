import { Injectable } from '@nestjs/common';
import { CreateSubsectionDto } from './dto/create-subsection.dto';
import { UpdateSubsectionDto } from './dto/update-subsection.dto';
import { SubSection } from './entities/subsection.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SubsectionService {

  constructor( 
    @InjectRepository(SubSection)
    private subsectionRepository: Repository<SubSection>,
  ) {}

  async create(createSubsectionDto: CreateSubsectionDto) {
    return await this.subsectionRepository.save(createSubsectionDto);
  }

  findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    return this.subsectionRepository.find({
      skip,
      take: limit,
    });
  }

  findOne(id: number) {
    return this.subsectionRepository.findOneBy({ id });
  }

  async update(id: number, updateSubsectionDto: UpdateSubsectionDto) {
    await this.subsectionRepository.update(id, updateSubsectionDto);
    return this.subsectionRepository.findOneBy({ id });
  }

  async remove(id: number) {
    await this.subsectionRepository.delete(id);
    return id;
  }
}