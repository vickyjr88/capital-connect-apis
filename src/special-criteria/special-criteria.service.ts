import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSpecialCriterionDto } from './dto/create-special-criterion.dto';
import { UpdateSpecialCriterionDto } from './dto/update-special-criterion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SpecialCriterion } from './entities/special-criterion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SpecialCriteriaService {
  constructor(
    @InjectRepository(SpecialCriterion)
    private readonly specialCriteriaRepository: Repository<SpecialCriterion>,
  ){}

  async create(createSpecialCriterionDto: CreateSpecialCriterionDto) {
    return await this.specialCriteriaRepository.save(createSpecialCriterionDto);
  }

  findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    return this.specialCriteriaRepository.find({
      skip,
      take: limit,
    });
  }

  findOne(id: number) {
    const special = this.specialCriteriaRepository.findOneBy( {id} );
    if (!special) {
      throw new NotFoundException(`Special criteria with id ${id} not found`);
    }
    return special;
  }

  async update(id: number, updateSpecialCriterionDto: UpdateSpecialCriterionDto) {
    const { title, description} = updateSpecialCriterionDto;
    const updates = {}
    if (title) updates['title'] = title;
    if (description) updates['description'] = description;
    if (Object.keys(updates).length > 0) await this.specialCriteriaRepository.update(id, updates);
    return this.specialCriteriaRepository.findOneBy({ id });
  }

  remove(id: number) {
    this.specialCriteriaRepository.delete(id);
  }
}
