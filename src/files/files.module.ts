import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyService } from 'src/company/company.service';
import { Company } from 'src/company/entities/company.entity';
import { User } from 'src/users/entities/user.entity';
import { File } from './entities/file.entity';
import { S3Module } from 'src/s3/s3.module';

@Module({
  imports: [TypeOrmModule.forFeature([File, User, Company]), S3Module],
  controllers: [FilesController],
  providers: [FilesService, UsersService, CompanyService],
})
export class FilesModule {}
