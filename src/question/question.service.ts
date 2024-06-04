import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Repository } from 'typeorm';
import { Question } from './entities/question.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionsRepository: Repository<Question>
  ) {}

  async create(createQuestionDto: CreateQuestionDto) {
    return await this.questionsRepository.save(createQuestionDto);
  }

  findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    return this.questionsRepository.find({
      skip,
      take: limit,
    });
  }

  findOne(id: number) {
    return this.questionsRepository.findOneBy({ id });
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    await this.questionsRepository.update(id, updateQuestionDto);
    return this.questionsRepository.findOneBy({ id });
  }

  async remove(id: number) {
    await this.questionsRepository.delete(id);
    return id;
  }
}
