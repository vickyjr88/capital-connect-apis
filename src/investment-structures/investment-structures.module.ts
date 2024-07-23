import { Module } from '@nestjs/common';
import { InvestmentStructuresService } from './investment-structures.service';
import { InvestmentStructuresController } from './investment-structures.controller';

@Module({
  controllers: [InvestmentStructuresController],
  providers: [InvestmentStructuresService],
})
export class InvestmentStructuresModule {}
