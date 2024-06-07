import { Module } from '@nestjs/common';
import { SectionService } from './section.service';
import { SectionController } from './section.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Section } from './entities/section.entity';
import { SubsectionService } from 'src/subsection/subsection.service';
import { SubSection } from 'src/subsection/entities/subsection.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Section, SubSection])],
  controllers: [SectionController],
  providers: [SectionService, SubsectionService],
})
export class SectionModule {}
