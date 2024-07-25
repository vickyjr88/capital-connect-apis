import { Module } from '@nestjs/common';
import { FundingService } from './funding.service';
import { FundingController } from './funding.controller';
import { Funding } from './entities/funding.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Funding])],
  controllers: [FundingController],
  providers: [FundingService],
})
export class FundingModule {}
