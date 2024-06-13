import { HttpCode, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import * as util from 'util';
import { File } from './entities/file.entity';
import { CreateFileDto } from './dto/create-file.dto';
import { CompanyService } from 'src/company/company.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class FilesService {
    // private readonly readdir = util.promisify(fs.readdir);
    constructor(
        private companyService: CompanyService,
        private userService: UsersService
      ) {}
    @InjectRepository(File)
    private fileRepository: Repository<File>;

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

    // async findBusinessLogo(filename: string): Promise<string | null> {
    //     const dir = './uploads/company-logos';
    //     const logoName = filename.split(" ").join("_");
    //     try {
    //         const files = await this.readdir(dir);
    //         for (const file of files) {
    //             if (file.indexOf(logoName) != -1) {
    //                 return file;
    //             }
    //         }
    //         throw new NotFoundException('Logo not found')
    //     } catch (error) {
    //         console.error('Error trying to read file directory', error);
    //         throw error;
    //     }
    // }

}
