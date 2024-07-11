import { Module } from '@nestjs/common';
import { ScoringService } from './scoring.service';
import { ScoringController } from './scoring.controller';
import { Scoring } from './entities/scoring.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Scoring])],
  controllers: [ScoringController],
  providers: [ScoringService],
})
export class ScoringModule {}
