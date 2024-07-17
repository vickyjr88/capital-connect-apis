import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { Payment } from './entities/payment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { AuthMiddleware } from '../shared/auth.middleware';
import { TokenService } from '../shared/token.service';

@Module({
  imports: [TypeOrmModule.forFeature([Payment]), HttpModule],
  controllers: [PaymentController],
  providers: [PaymentService, TokenService],
})
export class PaymentModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'payments/callback', method: RequestMethod.POST },
        { path: 'payments/:id', method: RequestMethod.GET },
      );
  }
}
