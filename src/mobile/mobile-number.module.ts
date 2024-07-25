import { Module } from '@nestjs/common';
import { MobileNumberController } from './mobile-number.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MobileNumber } from './entities/mobile-number.entity';
import { MobileNumberService } from './mobile-number.service';

@Module({
  imports: [TypeOrmModule.forFeature([MobileNumber])],
  controllers: [MobileNumberController],
  providers: [MobileNumberService],
})
export class MobileNumberModule {}
