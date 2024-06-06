import { Module } from '@nestjs/common';
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
import ormConfig from 'ormconfig';

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
    AuthModule,
    UsersModule,
    CompanyModule,
    QuestionModule,
    SectionModule,
    AnswerModule,
    SubsectionModule,
    SubmissionModule,
  ],
  providers: [AppService],
  controllers: [
    AppController
  ]
})
export class AppModule {}
