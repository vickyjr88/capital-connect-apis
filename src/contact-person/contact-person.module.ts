import { Module } from '@nestjs/common';
import { ContactPersonService } from './contact-person.service';
import { ContactPersonController } from './contact-person.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactPerson } from './entities/contact-person.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContactPerson])],
  controllers: [ContactPersonController],
  providers: [ContactPersonService],
})
export class ContactPersonModule {}
