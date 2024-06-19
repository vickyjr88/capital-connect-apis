import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './entities/file.entity';
import { CreateFileDto } from './dto/create-file.dto';
import { CompanyService } from 'src/company/company.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class FilesService {
    constructor(
      @InjectRepository(File)
      private fileRepository: Repository<File>,
      private companyService: CompanyService,
      private userService: UsersService
      ) {}

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
