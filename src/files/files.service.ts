import { HttpCode, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import * as util from 'util';
import { File } from './entities/file.entity';
// import * as AWS from 'aws-sdk';
import { CompanyService } from 'src/company/company.service';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

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

    // private readonly s3 = new AWS.S3({
    //   accessKeyId: this.configService.getOrThrow("AWS_ACCESS_KEY_ID"),
    //   secretAccessKey: this.configService.getOrThrow("AWS_SECREST_ACCESS_KEY")
    // })

    async uploadFile(fileName: string, file: Buffer) {
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: 'nestjs-uploader',
          Key: fileName,
          Body: file
        })
      )
    }

    async createComponyLogo(userId: number, filePath: string): Promise<File> {
        const user = await this.userService.findOne(userId);
        const companyFound = await this.findCompanyByUserId(userId);
        if(!companyFound) {
            throw new NotFoundException('Company not found');
        } else {
            const newLogo = this.fileRepository.create({ path: filePath });
            const savedLogo = await this.fileRepository.save(newLogo);
            companyFound.companyLogo = savedLogo;
            return newLogo;
        }
    }

    async findCompanyByUserId(userId: number) {
        const user = await this.userService.findOne(userId)
        if(!user) {
            throw new NotFoundException('User not found');
        } else {
          return await this.companyService.findOneByUser(user);
        }
    
      }

}
