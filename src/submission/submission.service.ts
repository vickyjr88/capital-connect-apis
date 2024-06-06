import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Submission } from './entities/submission.entity';

@Injectable()
export class SubmissionService {
  constructor(
    @InjectRepository(Submission)
    private submissionRepository: Repository<Submission>,
  ) {}

  async create(submission: Submission): Promise<Submission> {
    return this.submissionRepository.save(submission);
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
