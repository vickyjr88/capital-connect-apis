import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentService {
  constructor( 
    @InjectRepository(Payment)
    private paymentsRepository: Repository<Payment>
  ) {}

  async create(createPaymentDto: CreatePaymentDto) {
    const payment = await this.paymentsRepository.save(createPaymentDto);
    payment.createdAt = new Date();
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
    const { currency, amount, description, status, OrderTrackingId } = updatePaymentDto;
    const updates = {};
    if (currency) updates['currency'] = currency;
    if (amount) updates['amount'] = amount;
    if (description) updates['description'] = description;
    if (status) updates['status'] = status;
    if (OrderTrackingId) updates['OrderTrackingId'] = OrderTrackingId;
    if (Object.keys(updates).length > 0) await this.paymentsRepository.update(id, updatePaymentDto);
    //updates.updatedAt = new Date();
    return this.paymentsRepository.findOneBy({ id });
  }

  remove(id: number) {
    this.paymentsRepository.delete(id);
  }
}
