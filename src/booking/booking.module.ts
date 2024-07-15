import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { Payment } from 'src/payment/entities/payment.entity';
import { PaymentService } from 'src/payment/payment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, Payment])],
  controllers: [BookingController],
  providers: [BookingService, PaymentService],
})
export class BookingModule {}
