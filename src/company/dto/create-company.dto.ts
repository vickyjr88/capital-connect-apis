import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

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
  yearsOfOperation: number;

  @IsString()
  @IsNotEmpty()
  growthStage: string;

  @IsNotEmpty()
  numberOfEmployees: number;

  @IsBoolean()
  @IsNotEmpty()
  fullTimeBusiness: boolean;
}
