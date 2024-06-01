import { Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { Repository } from 'typeorm';
import { Answer } from './entities/answer.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AnswerService {

  constructor(
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>
  ) {}

  create(createAnswerDto: CreateAnswerDto) {
    return this.answerRepository.save(createAnswerDto);
  }

  findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    return this.answerRepository.find({
      skip,
      take: limit,
    });
  }

  findOne(id: number) {
    return this.answerRepository.findOneBy({ id });
  }

  async update(id: number, updateAnswerDto: UpdateAnswerDto) {
    await this.answerRepository.update(id, updateAnswerDto);
    return this.answerRepository.findOneBy({ id });
  }

  async remove(id: number) {
    await this.answerRepository.delete(id);
    return id;
  }
}
