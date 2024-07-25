import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompanyModule } from './company/company.module';
import { SubsectionModule } from './subsection/subsection.module';
import { AnswerModule } from './answer/answer.module';
import { SectionModule } from './section/section.module';
import { QuestionModule } from './question/question.module';
import { SubmissionModule } from './submission/submission.module';
import { FilesModule } from './files/files.module';
import { S3Module } from './s3/s3.module';
import ormConfig from 'ormconfig';
import { SectorModule } from './sector/sector.module';
import { SubSectorModule } from './subsector/subsector.module';
import { LoggingMiddleware } from './logging.middleware';
import { CustomLogger } from './shared/utils/custom-logger.util';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ScoringModule } from './scoring/scoring.module';
import { PaymentModule } from './payment/payment.module';
import { BookingModule } from './booking/booking.module';
import { CountryModule } from './country/country.module';
import { StageModule } from './stage/stage.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the ConfigService available globally
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => (ormConfig),
      inject: [ConfigService],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'), // Adjust the path to your templates directory
    }),
    AuthModule,
    UsersModule,
    CompanyModule,
    QuestionModule,
    SectionModule,
    AnswerModule,
    SubsectionModule,
    SubmissionModule,
    FilesModule,
    S3Module,
    SectorModule,
    SubSectorModule,
    ScoringModule,
    PaymentModule,
    BookingModule,
    CountryModule,
    StageModule,
  ],
  providers: [
    AppService,
    CustomLogger,
    {
      provide: 'CustomLogger',
      useClass: CustomLogger,
    },
  ],
  controllers: [
    AppController
  ]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
