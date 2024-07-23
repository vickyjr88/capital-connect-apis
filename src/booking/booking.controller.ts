import { Body, Controller, Delete, Get, HttpException, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { BookingService } from "./booking.service";
import { PaymentService } from "src/payment/payment.service";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { UpdateBookingDto } from "./dto/update-booking.dto";
import { HeadersToken } from "src/shared/headers.decorators";
import { HttpService } from "@nestjs/axios";


@Controller('bookings')
@UseGuards(JwtAuthGuard)
export class BookingController {
  constructor(
    private readonly bookingService: BookingService,
    private readonly paymentService: PaymentService,
    private readonly httpService: HttpService
  ) {}

  @Post()
  async createBooking(@HeadersToken() pesapalToken: string, @Body() createBookingDto: CreateBookingDto, @Req() req) {
    const { calendlyEventId } = createBookingDto;
    const user = req.user;
    const booking = await this.bookingService.createBooking(calendlyEventId, user.id);

    console.log("User", user);

    const bookingResponse = {} as any;
    bookingResponse.bookingId = booking.id;

    try {
      const response = await this.httpService.post(`${process.env.PESAPAL_BASE_URL}/Transactions/SubmitOrderRequest`, {
        "id": booking.id,
        "currency": "KES",
        "amount": process.env.ADVISORY_SESSIONS_COST,
        "description": "Advisory session booking fee.",
        "callback_url": "https://calendly.com/investor-eligibility/investor-preparedness",
        "redirect_mode": "PARENT_WINDOW",
        "notification_id": "65c77d95-af39-440d-88f5-dd0114174e1c",
        "branch": "Capital Connect Africa App",
        "billing_address": {
            "email_address": user.username,
            "phone_number": "0771114712", // ToDo: Get user phone number
            "country_code": "KE",
            "first_name": user.firstName,
            "middle_name": user.lastName,
            "last_name": user.lastName,
            "line_1": "Rasin Capital",
            "line_2": "",
            "city": "",
            "state": "",
            "postal_code": "",
            "zip_code": ""
        }
      }, 
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${pesapalToken}`
        }
      }).toPromise();

      // Redirect url: https://pay.pesapal.com/iframe/PesapalIframe3/Index?OrderTrackingId=[order_tracking_id]
      const res = response.data;
      if (res.status !== '200') throw new HttpException("Failed to initiate payment", 500);
      bookingResponse.orderTrackingId = res.order_tracking_id;
      bookingResponse.redirectUrl = res.redirect_url;
      const payment = await this.paymentService.createPayment({ bookingId: booking.id, orderTrackingId: res.order_tracking_id, userId: user.id });
      bookingResponse.paymentId = payment.id;
      console.log("Response", res);
    } catch (error) {
      console.error("Error", error);
      throw new HttpException("Failed to initiate payment", 500);
    }

    return bookingResponse;
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
