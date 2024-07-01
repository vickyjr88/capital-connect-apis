import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubmissionService } from './submission.service';
import { SubmissionController } from './submission.controller';
import { Submission } from './entities/submission.entity';
import { Question } from 'src/question/entities/question.entity';
import { Answer } from 'src/answer/entities/answer.entity';
import { IsAnswerExistsConstraint, IsQuestionExistsConstraint } from '../shared/validators/custom.validator';
import { SubSection } from 'src/subsection/entities/subsection.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Submission, Question, Answer, SubSection])],
  providers: [
    SubmissionService,
    IsQuestionExistsConstraint,
    IsAnswerExistsConstraint
  ],
  controllers: [SubmissionController],
})
export class SubmissionModule {}
