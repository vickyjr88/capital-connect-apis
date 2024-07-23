import { Module } from '@nestjs/common';
import { InvestmentStructuresService } from './investment-structures.service';
import { InvestmentStructuresController } from './investment-structures.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvestmentStructure } from './entities/investment-structure.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InvestmentStructure])],
  controllers: [InvestmentStructuresController],
  providers: [InvestmentStructuresService],
})
export class InvestmentStructuresModule {}
