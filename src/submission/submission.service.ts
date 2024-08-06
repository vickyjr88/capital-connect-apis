import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Submission } from './entities/submission.entity';
import { UpdateSubmissionDto } from './dto/update-submission.dto';

@Injectable()
export class SubmissionService {
  constructor(
    @InjectRepository(Submission)
    private submissionRepository: Repository<Submission>,
  ) {}

  async create(submission: Submission): Promise<Submission> {
    return this.submissionRepository.save(submission);
  }

  async findSubmission(userId: number, questionId: number, answerId: number,){
    return await this.submissionRepository.findOne({
    where: {
      user: { id: userId },
      question: { id: questionId },
      answer: { id: answerId },
    },
    relations: ['user', 'question', 'answer'],
  });
  }

  async update(id: number, updateSubmissionDto: UpdateSubmissionDto){
    const { answerId, text } = updateSubmissionDto;
    const updates = {};
    if (answerId) updates["answerId"] = answerId;
    if (text) updates["text"] = text;
    if (Object.keys(updates).length > 0) await this.submissionRepository.update(id, updateSubmissionDto);
    return this.submissionRepository.findOneBy({ id });
  }

  async findOne(id: number): Promise<Submission> {
    const submission = await this.submissionRepository.findOne({ where: { id } });
    if (!submission) {
      throw new NotFoundException(`Submission with id ${id} not found`);
    }
    return submission;
  }

  async createMultiple(submissions: Submission[]): Promise<Submission[]> {
    return this.submissionRepository.save(submissions);
  }

  async findAll(): Promise<Submission[]> {
    return this.submissionRepository.find({ relations: ['user', 'question', 'answer'] });
  }

  async findByUser(userId: number): Promise<Submission[]> {
    return this.submissionRepository.find({ where: { user: { id: userId } }, relations: ['question', 'answer'] });
  }

  async calculateScore(userId: number): Promise<number> {
    const submissions = await this.findByUser(userId);
    return submissions.reduce((total, submission) => total + submission.answer.weight, 0);
  }
}
