import { Injectable } from '@nestjs/common';
import { CreateScoringDto } from './dto/create-scoring.dto';
import { UpdateScoringDto } from './dto/update-scoring.dto';
import { Scoring } from './entities/scoring.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ScoringService {
  constructor( 
    @InjectRepository(Scoring)
    private scoringsRepository: Repository<Scoring>,
  ) {}

  async create(createScoringDto: CreateScoringDto) {
    const scoring = await this.scoringsRepository.save(createScoringDto)
    return scoring;
  }

  findAll() {
    return `This action returns all scoring`;
  }

  findOne(id: number) {
    return `This action returns a #${id} scoring`;
  }

  update(id: number, updateScoringDto: UpdateScoringDto) {
    return `This action updates a #${id} scoring`;
  }

  remove(id: number) {
    return `This action removes a #${id} scoring`;
  }
}
