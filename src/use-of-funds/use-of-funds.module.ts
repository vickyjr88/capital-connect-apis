import { Module } from '@nestjs/common';
import { UseOfFundsService } from './use-of-funds.service';
import { UseOfFundsController } from './use-of-funds.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UseOfFunds } from './entities/use-of-funds.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UseOfFunds])],
  controllers: [UseOfFundsController],
  providers: [UseOfFundsService],
})
export class UseOfFundsModule {}
