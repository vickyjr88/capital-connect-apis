import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { BookingService } from "./booking.service";
import { PaymentService } from "src/payment/payment.service";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { UpdateBookingDto } from "./dto/update-booking.dto";


@Controller('bookings')
@UseGuards(JwtAuthGuard)
export class BookingController {
  constructor(
    private readonly bookingService: BookingService,
    private readonly paymentService: PaymentService,
  ) {}

  @Post()
  async createBooking(@Body() createBookingDto: CreateBookingDto, @Req() req) {
    const { calendlyEventId, paymentProcessorId } = createBookingDto;
    const booking = await this.bookingService.createBooking(calendlyEventId, req.user);
    const payment = await this.paymentService.createPayment({ bookingId: booking.id, orderTrackingId: paymentProcessorId, userId: req.user.id });
    return { booking, payment };
  }

  @Get()
  findAll() {
    return this.bookingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingService.update(+id, updateBookingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingService.remove(+id);
  }
}
