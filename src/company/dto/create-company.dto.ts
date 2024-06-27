import { IsBoolean, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { NumberOfEmployees, YearsOfOperation } from "../company.type";

export class CreateCompanyDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  businessSector: string;

  @IsString()
  @IsNotEmpty()
  productsAndServices: string;

  @IsString()
  @IsNotEmpty()
  registrationStructure: string;

  @IsNotEmpty()
  @IsEnum(YearsOfOperation)
  yearsOfOperationEnum: YearsOfOperation;

  @IsString()
  @IsNotEmpty()
  growthStage: string;

  @IsNotEmpty()
  @IsEnum(NumberOfEmployees)
  numberOfEmployeesEnum: NumberOfEmployees;

  @IsBoolean()
  @IsNotEmpty()
  fullTimeBusiness: boolean;
}
