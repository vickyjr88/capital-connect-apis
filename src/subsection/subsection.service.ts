import { Injectable, NotFoundException } from '@nestjs/common';
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

  async create(subSection: SubSection) {
    return await this.subsectionRepository.save(subSection);
  }

  findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    return this.subsectionRepository.find({
      skip,
      take: limit,
    });
  }

  async findOne(id: number) {
    const subsection = await this.subsectionRepository.findOneBy({ id });
    if (!subsection) {
      throw new NotFoundException(`Subsection with id ${id} not found`);
    }
    return subsection;
  }

  async update(id: number, updateSubsectionDto: UpdateSubsectionDto) {
    const { sectionId, name } = updateSubsectionDto;
    const updates = {};
    if (name) updates['name'] = name;
    if (Object.keys(updates).length > 0) await this.subsectionRepository.update(id, updates);
    return this.subsectionRepository.findOneBy({ id });
  }

 remove(id: number) {
   this.subsectionRepository.delete(id);
  }

  async findSubsections(id: number): Promise<SubSection[]> {
    console.log('id', id);
    return this.subsectionRepository.find({
      where: { section: { id } }
    });
  }
}
