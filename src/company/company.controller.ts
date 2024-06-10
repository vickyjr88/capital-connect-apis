import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decorator';


@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.companyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      const company = this.companyService.findOne(+id);
      if (company) {
        return company;
      }
    } catch (error) {
      return error.message;
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    try {
      return this.companyService.update(+id, updateCompanyDto);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyService.remove(+id);
  }
}
