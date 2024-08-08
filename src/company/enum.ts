import { Controller, Get } from '@nestjs/common';
import { CompanyService } from './company.service';

@Controller('companys')
export class CompanyEnumController {
  constructor(private readonly companyService: CompanyService) {}

  @Get('employees')
  getNumberOfEmployees() {
    return this.companyService.getNumberOfEmployees();
  }

  @Get('years')
  getYearsOfOperation() {
    return this.companyService.getYearsOfOperation();
  }
}

