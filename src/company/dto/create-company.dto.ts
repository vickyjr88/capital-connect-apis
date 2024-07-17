import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
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
  @IsOptional()
  businessSubsector: string;

  @IsString()
  @IsNotEmpty()
  productsAndServices: string;

  @IsString()
  @IsNotEmpty()
  registrationStructure: string;

  @IsNotEmpty()
  @IsEnum(YearsOfOperation)
  yearsOfOperation: YearsOfOperation;

  @IsString()
  @IsNotEmpty()
  growthStage: string;

  @IsNotEmpty()
  @IsEnum(NumberOfEmployees)
  numberOfEmployees: NumberOfEmployees;

  @IsBoolean()
  @IsNotEmpty()
  fullTimeBusiness: boolean;
}
