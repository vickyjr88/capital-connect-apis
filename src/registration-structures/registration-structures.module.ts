import { Module } from '@nestjs/common';
import { RegistrationStructuresService } from './registration-structures.service';
import { RegistrationStructuresController } from './registration-structures.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistrationStructure } from './entities/registration-structure.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RegistrationStructure])],
  controllers: [RegistrationStructuresController],
  providers: [RegistrationStructuresService],
})
export class RegistrationStructuresModule {}
