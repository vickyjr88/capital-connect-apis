import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { SubSection } from 'src/subsection/entities/subsection.entity';
import { SubsectionService } from 'src/subsection/subsection.service';

@Module({
  imports: [TypeOrmModule.forFeature([Question, SubSection])],
  controllers: [QuestionController],
  providers: [QuestionService, SubsectionService],
})
export class QuestionModule {}
