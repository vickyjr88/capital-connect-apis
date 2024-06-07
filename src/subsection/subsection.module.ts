import { Module } from '@nestjs/common';
import { SubsectionService } from './subsection.service';
import { SubsectionController } from './subsection.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubSection } from './entities/subsection.entity';
import { Section } from 'src/section/entities/section.entity';
import { SectionService } from 'src/section/section.service';
import { Question } from 'src/question/entities/question.entity';
import { QuestionService } from 'src/question/question.service';

@Module({
  imports: [TypeOrmModule.forFeature([SubSection, Section, Question])],
  controllers: [SubsectionController],
  providers: [SubsectionService, SectionService, QuestionService],
})
export class SubsectionModule {}
