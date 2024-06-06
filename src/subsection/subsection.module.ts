import { Module } from '@nestjs/common';
import { SubsectionService } from './subsection.service';
import { SubsectionController } from './subsection.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubSection } from './entities/subsection.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubSection])],
  controllers: [SubsectionController],
  providers: [SubsectionService],
})
export class SubsectionModule {}
