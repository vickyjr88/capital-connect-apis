import { Module } from '@nestjs/common';
import { SubsectionService } from './subsection.service';
import { SubsectionController } from './subsection.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubSection } from './entities/subsection.entity';
import { Section } from 'src/section/entities/section.entity';
import { SectionService } from 'src/section/section.service';

@Module({
  imports: [TypeOrmModule.forFeature([SubSection, Section])],
  controllers: [SubsectionController],
  providers: [SubsectionService, SectionService],
})
export class SubsectionModule {}
