import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from './entities/answer.entity';
import { QuestionService } from 'src/question/question.service';
import { Question } from 'src/question/entities/question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Answer]), TypeOrmModule.forFeature([Question]),],
  controllers: [AnswerController],
  providers: [AnswerService, QuestionService],
})
export class AnswerModule {}
