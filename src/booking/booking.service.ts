import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateBookingDto } from './dto/update-booking.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
  ) {}

  async createBooking(calendlyEventId: string, user: User): Promise<Booking> {
    const booking = this.bookingRepository.create({
      calendlyEventId,
      user,
    });
    return this.bookingRepository.save(booking);
  }

  findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    return this.bookingRepository.find({
      skip,
      take: limit,
    });
  }

  async findOne(id: number) {
    const booking = await this.bookingRepository.findOneBy({ id });
    if (!booking) {
      throw new NotFoundException(`Booking with id ${id} not found`);
    } 
    return booking;
  }

  async update(id: number, updateBookingDto: UpdateBookingDto) {
    const { calendlyEventId } = updateBookingDto;
    const updates = {};
    if (calendlyEventId) updates['calendlyEventId'] = calendlyEventId;
    if (Object.keys(updates).length > 0) await this.bookingRepository.update(id, updateBookingDto);
    return this.bookingRepository.findOneBy({ id });
  }

  remove(id: number) {
    this.bookingRepository.delete(id);
  }
}
