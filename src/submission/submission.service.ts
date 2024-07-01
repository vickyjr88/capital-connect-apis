import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Submission } from './entities/submission.entity';
import { Question } from 'src/question/entities/question.entity';
import { SubSection } from 'src/subsection/entities/subsection.entity';

@Injectable()
export class SubmissionService {
  constructor(
    @InjectRepository(Submission)
    private submissionRepository: Repository<Submission>,
    @InjectRepository(Question)
    private questionsRepository: Repository<Question>,
    @InjectRepository(SubSection)
    private subSectionsRepository: Repository<SubSection>,
  ) {}

  async getSubmissionsGroupedBySubsections(userId: number): Promise<any> {
    const subsections = await this.subSectionsRepository.createQueryBuilder('subSection')
      .leftJoinAndSelect('subSection.questions', 'question')
      .leftJoinAndSelect('question.submissions', 'submission', 'submission.userId = :userId', { userId })
      .getMany();

    return subsections.map(subSection => ({
      sub_section_id: subSection.id,
      sub_section_name: subSection.name,
      questions: subSection.questions.map(question => question.id),
    }));
  }

  async create(submission: Submission): Promise<Submission> {
    return this.submissionRepository.save(submission);
  }

  async createMultiple(submissions: Submission[]): Promise<Submission[]> {
    return this.submissionRepository.save(submissions);
  }

  async findAll(): Promise<Submission[]> {
    return this.submissionRepository.find({ relations: ['user', 'question', 'answer'] });
  }

  async findAllByQuestionIds(questionIds: number[]): Promise<Submission[]> {
    return this.submissionRepository.find({ where: { question: { id: In(questionIds) }}, relations: ['question', 'answer'] });
  }

  async findByUser(userId: number): Promise<Submission[]> {
    return this.submissionRepository.find({ where: { user: { id: userId } }, relations: ['question', 'answer', 'question.subSection']});
  }

  async calculateScore(userId: number): Promise<any> {
    const submissions = await this.getSubmissionsGroupedBySubsections(userId);
    let subSectionsScores = [];
    for (const subSection of submissions) {
      if (subSection.questions.length > 0) {
        const questions = await this.findAllByQuestionIds(subSection.questions);
        const score = questions.reduce((total, submission) => total + submission.answer.weight, 0);
        subSectionsScores.push({ subSectionId: subSection.sub_section_id, subSectionName: subSection.sub_section_name, score });
      }
    }
    return subSectionsScores;
  }
}
