import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './entities/file.entity';
// import * as AWS from 'aws-sdk';
import { CompanyService } from 'src/company/company.service';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { CreateFileDto } from './dto/create-file.dto';

@Injectable()
export class FilesService {

    constructor(
        private companyService: CompanyService,
        private userService: UsersService,
        private readonly configService: ConfigService
      ) {}

    @InjectRepository(File)
    private fileRepository: Repository<File>;

    private readonly s3Client = new S3Client({
      region: this.configService.getOrThrow('AWS_S3_REGION'),
    });

    async uploadFile(fileName: string, file: Buffer) {
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: 'nestjs-uploader',
          Key: fileName,
          Body: file
        })
      )
    }

    async createComponyLogo(userId: number, createFileDto: CreateFileDto) {
        const user = await this.userService.findOne(userId);
        const companyFound = await this.companyService.findOneByUser(user);
        if(!companyFound) {
            throw new NotFoundException('Company not found');
        } else {
            const newLogo = this.fileRepository.create(createFileDto);
            const savedLogo = await this.fileRepository.save(newLogo);
            this.companyService.updateLogoUrl(companyFound.id, savedLogo.id);

            return newLogo;
        }
    }

}
