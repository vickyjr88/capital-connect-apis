import { Module } from '@nestjs/common';
import { OtpController } from './otp.controller';
import { OtpService } from './otp.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MobileNumber } from 'src/mobile/entities/mobile-number.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MobileNumber])],
  controllers: [OtpController],
  providers: [OtpService],
})
export class OtpModule {}
