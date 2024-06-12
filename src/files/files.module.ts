import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyModule } from 'src/company/company.module';
import { CompanyService } from 'src/company/company.service';

@Module({
  imports: [TypeOrmModule.forFeature([File]), UsersModule, CompanyModule],
  controllers: [FilesController],
  providers: [FilesService, UsersService, CompanyService],
  exports: [FilesService, TypeOrmModule]
})
export class FilesModule {}
