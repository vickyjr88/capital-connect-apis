import { Module } from '@nestjs/common';
import { SubsectionService } from './subsection.service';
import { SubsectionController } from './subsection.controller';

@Module({
  controllers: [SubsectionController],
  providers: [SubsectionService],
})
export class SubsectionModule {}
