import { Module } from '@nestjs/common';
import { ScoringService } from './scoring.service';
import { ScoringController } from './scoring.controller';
import { Scoring } from './entities/scoring.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomLogger } from 'src/shared/utils/custom-logger.util';

@Module({
  imports: [TypeOrmModule.forFeature([Scoring])],
  controllers: [ScoringController],
  providers: [
    ScoringService,
    CustomLogger,
    {
      provide: 'CustomLogger',
      useClass: CustomLogger,
    },],
})
export class ScoringModule {}
