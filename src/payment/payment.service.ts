import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from 'src/booking/entities/booking.entity';
import { User } from 'src/users/entities/user.entity';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class PaymentService {
  constructor( 
    @InjectRepository(Payment)
    private paymentsRepository: Repository<Payment>,
    private readonly httpService: HttpService
  ) {}

  async processPaymentCallback(pesapalToken: string, updatePaymentStatusDto: UpdatePaymentDto) {
    console.log('Processing payment callback with token:', pesapalToken);
    const { status, orderTrackingId } = updatePaymentStatusDto;
    const payment = await this.paymentsRepository.findOneBy({ orderTrackingId });
    if (!payment) throw new NotFoundException(`Payment with order tracking id ${orderTrackingId} not found`);
    payment.status = status;
    this.paymentsRepository.save(payment);
    return { message: "Payment processed successfully" };
  }

  async checkPaymentStatus(pesapalToken: string, orderTrackingId: string) {
    const response = await this.httpService.get(`${process.env.PESAPAL_BASE_URL}/Transactions/GetTransactionStatus?orderTrackingId=${orderTrackingId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${pesapalToken}`
      }
    }).toPromise();

    if (response.status !== 200) throw new HttpException("Failed to fetch payment", 500);

    return response.data;
  }

  async createPayment(createPaymentDto: CreatePaymentDto) {
    const { orderTrackingId, bookingId, userId } = createPaymentDto;
    const paymentObj = new Payment();
    paymentObj.currency = process.env.CURRENCY || "KES";
    paymentObj.amount = Number(process.env.ADVISORY_SESSIONS_COST) || 10000;
    paymentObj.status = "initiated";
    paymentObj.description = "Advisory sessesion payment";
    paymentObj.orderTrackingId = orderTrackingId;
    paymentObj.user = { id: userId } as User;
    if (bookingId) paymentObj.booking = { id: bookingId } as Booking;
    const payment = await this.paymentsRepository.save(paymentObj);
    return payment;
  }

  findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    return this.paymentsRepository.find({
      skip,
      take: limit,
    });
  }

  async findOne(id: number) {
    const payment = await this.paymentsRepository.findOneBy({ id });
    if (!payment) {
      throw new NotFoundException(`Payment with id ${id} not found`);
    } 
    return payment;
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    const { currency, amount, description, status, orderTrackingId } = updatePaymentDto;
    const updates = {};
    if (currency) updates['currency'] = currency;
    if (amount) updates['amount'] = amount;
    if (description) updates['description'] = description;
    if (status) updates['status'] = status;
    if (orderTrackingId) updates['OrderTrackingId'] = orderTrackingId;
    if (Object.keys(updates).length > 0) await this.paymentsRepository.update(id, updatePaymentDto);
    return this.paymentsRepository.findOneBy({ id });
  }

  remove(id: number) {
    this.paymentsRepository.delete(id);
  }
}
