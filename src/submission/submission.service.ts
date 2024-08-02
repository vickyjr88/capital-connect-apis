import { Injectable } from '@nestjs/common';
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
    const { userId, questionId, answerId} = updateSubmissionDto;
    const updates = {};
    if (userId) updates["userId"] = userId;
    if (questionId) updates["questionId"] = questionId;
    if (answerId) updates["answerId"] = answerId;
    if (Object.keys(updates).length > 0) await this.submissionRepository.update(id, updateSubmissionDto);
    return this.submissionRepository.findOneBy({ id });
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
