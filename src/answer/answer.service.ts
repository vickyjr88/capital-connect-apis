import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findOne(id: number) {
    const answer = await this.answerRepository.findOneBy({ id });
    if (!answer) {
      throw new NotFoundException(`Answer with id ${id} not found`);
    }
    return answer
  }

  async update(id: number, updateAnswerDto: UpdateAnswerDto) {
    const { questionId, ...updates } = updateAnswerDto;
    await this.answerRepository.update(id, updates);
    const answer = await this.answerRepository.findOneBy({ id });
    return answer;
  }

  async remove(id: number) {
    this.answerRepository.delete(id);
    return id;
  }
}
