import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsArray,
  IsNumber,
  ArrayNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreateInvestorProfileDto {
  @IsString()
  @IsNotEmpty()
  headOfficeLocation: string;

  @IsString()
  @IsOptional()
  organizationName: string;

  @IsEmail()
  emailAddress: string;

  @IsString()
  @IsNotEmpty()
  contactPerson: string;

  @IsArray()
  @ArrayNotEmpty()
  countriesOfInvestmentFocus: string[];

  @IsArray()
  useOfFunds: string[];

  @IsNumber()
  maximumFunding: number;

  @IsNumber()
  minimumFunding: number;

  @IsArray()
  @ArrayNotEmpty()
  sectorsOfInvestment: string[];

  @IsArray()
  @ArrayNotEmpty()
  businessGrowthStages: string[];

  @IsString()
  @IsNotEmpty()
  investorType: string;

  @IsArray()
  investmentStructures: string[];

  @IsArray()
  esgFocusAreas: string[];

  @IsArray()
  registrationStructures: string[];
}
