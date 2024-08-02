import { Module } from '@nestjs/common';
import { InvestorTypesService } from './investor-types.service';
import { InvestorTypesController } from './investor-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvestorType } from './entities/investor-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InvestorType])],
  controllers: [InvestorTypesController],
  providers: [InvestorTypesService],
})
export class InvestorTypesModule {}
