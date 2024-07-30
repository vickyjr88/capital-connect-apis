import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class OtpService {
  private readonly apiKey = process.env.BREVO_API_KEY;
  private readonly apiUrl = 'http://api.brevo.com/v3/transactionalSMS/sms';

  async sendSms(mobileNumber: string, message: string): Promise<any> {
    try {
      const response = await axios.post(
        this.apiUrl,
        {
          sender: 'Capital Connect Africa',
          recipient: mobileNumber,
          content: message,
        },
        {
          headers: {
            'api-key': this.apiKey,
            'Content-Type': 'application/json',
          },
        },
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to send SMS: ${error.message}`);
    }
  }
}

