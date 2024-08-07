import { HttpService } from '@nestjs/axios';
import { Injectable, HttpException } from '@nestjs/common';
import * as process from 'node:process';

@Injectable()
export class TokenService {
  private token: string;
  private tokenExpiry: number;

  constructor(private readonly httpService: HttpService) {}

  async getToken(): Promise<string> {
    if (this.isTokenExpired()) {
      await this.refreshToken();
    }
    return this.token;
  }

  private isTokenExpired(): boolean {
    if (!this.token || !this.tokenExpiry) {
      return true;
    }
    const now = Math.floor(Date.now() / 1000);
    console.log(
      'Now',
      now,
      'Token expiry',
      this.tokenExpiry,
      'Difference',
      this.tokenExpiry - now,
    );
    return now >= this.tokenExpiry;
  }

  private async refreshToken(): Promise<void> {
    try {
      const response = await this.httpService
        .post(`${process.env.PESAPAL_BASE_URL}/Auth/RequestToken`, {
          consumer_key: process.env.PESAPAL_CONSUMER_KEY,
          consumer_secret: process.env.PESAPAL_CONSUMER_SECRET,
        })
        .toPromise();

      this.token = response.data.token;
      this.tokenExpiry = Math.floor(
        Date.parse(response.data.expiryDate) / 1000,
      );
      console.log('Token refreshed', this.tokenExpiry);
      const now = Math.floor(Date.now() / 1000);
      console.log(
        'Now',
        now,
        'Token expiry',
        this.tokenExpiry,
        'Difference',
        this.tokenExpiry - now,
      );
    } catch (error) {
      throw new HttpException('Failed to refresh token', 500);
    }
  }
}
