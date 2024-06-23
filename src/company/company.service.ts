import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
    private userService: UsersService,
  ) {}

  async create(userId, createCompanyDto: CreateCompanyDto) {
    const userFound = await this.userService.findOne(userId)
    if(!userFound) {
        throw new NotFoundException('User not found');
    } else {
        const newCompany = this.companyRepository.create(createCompanyDto);
        newCompany.user = userFound;
        return this.companyRepository.save(newCompany);
    }
  }

  findAll() {
    return this.companyRepository.find();
  }

  async findOne(id: number) {
    const company = await this.companyRepository.findOneBy({ id });
    if (company) {
      return company;
    } else {
      throw new NotFoundException('company not available');
    }
  }

  async findOneByOwnerId(id: number) {
    const company = await this.companyRepository.findOneBy({ user: { id } });
    if (company) {
      return company;
    } else {
      throw new NotFoundException('company not available');
    }
  }

  async findOneByUser(user: User) {
    const company = await this.companyRepository.findOne({ where: { user } });
    if (company) {
      return company;
    } else {
      throw new NotFoundException('company not available');
    }
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    const company = await this.findOne(id);
    if (!company) {
      throw new BadRequestException('company not available');
    }
    await this.companyRepository.update(id, updateCompanyDto);
    return this.companyRepository.findOneBy({ id });
  }

  async updateLogoUrl(id: number, logoId: number) {
    const company = await this.findOne(id);
    if (!company) {
      throw new BadRequestException('company not available');
    }
    company.companyLogo = { id: logoId } as any;
    await this.companyRepository.save(company);
    return this.companyRepository.findOneBy({ id });
  }

  remove(id: number) {
    this.companyRepository.delete(id);
    return id;
  }
}
