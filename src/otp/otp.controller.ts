import { Body, Controller, Injectable, Post } from "@nestjs/common";
import { OtpService } from "./otp.service";
import { generateOtp } from "./otp.util";
import { InjectRepository } from "@nestjs/typeorm";
import { MobileNumber } from "src/mobile/entities/mobile-number.entity";
import { Repository } from "typeorm";

@Injectable()
@Controller('otp')
export class OtpController { constructor(
    private readonly otpService: OtpService,
    @InjectRepository(MobileNumber)
    private readonly mobileNumberRepository: Repository<MobileNumber>,
  ) {}

  @Post()
  async sendOtp(@Body('phoneNo') phoneNo: string): Promise<any> {
    const otp = generateOtp();

    await this.mobileNumberRepository.save({
      phoneNo,
      otp
    });

    const message = `Your OTP code is ${otp}`;
    await this.otpService.sendSms(phoneNo, message);

    return { success: true, message: 'OTP sent successfully' };
  }

  @Post('verify')
  async verifyOtp(@Body('mobileNumber') phoneNo: string, @Body('otp') otp: string): Promise<any> {
    const record = await this.mobileNumberRepository.findOne({where: {phoneNo}});

    if (!record) {
      return { success: false, message: 'Mobile number not found' };
    }

    if (record.otp !== otp) {
      return { success: false, message: 'Invalid OTP' };
    }

    return { success: true, message: 'OTP verified successfully' };
  }
}

