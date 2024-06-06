import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findOne(id: number) {
    const question = await this.questionsRepository.findOneBy({ id });
    if (!question) {
      throw new NotFoundException(`Question with id ${id} not found`);
    }
    return question;
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    const { subSectionId, text } = updateQuestionDto;
    const updates = {};
    if (text) updates['text'] = text;
    if (Object.keys(updates).length > 0) await this.questionsRepository.update(id, updates);
    return await this.questionsRepository.findOneBy({ id });
  }

  remove(id: number) {
    this.questionsRepository.delete(id);
    return id;
  }
}
