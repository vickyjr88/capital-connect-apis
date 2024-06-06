import { Injectable } from '@nestjs/common';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Section } from './entities/section.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SectionService {

  constructor( 
    @InjectRepository(Section)
    private sectionRepository: Repository<Section>,
  ) {}

  async create(createSectionDto: CreateSectionDto) {
    return await this.sectionRepository.save(createSectionDto);
  }

  findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    return this.sectionRepository.find({
      skip,
      take: limit,
    });
  }

  findOne(id: number) {
    return this.sectionRepository.findOneBy({ id });
  }

  async update(id: number, updateSectionDto: UpdateSectionDto) {
    await this.sectionRepository.update(id, updateSectionDto);
    return this.sectionRepository.findOneBy({ id });
  }

  async remove(id: number) {
    await this.sectionRepository.delete(id);
    return id
  }
}
