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

  @IsString()
  fundDescription: string;

  @IsString()
  url: string;

  @IsEmail()
  emailAddress: string;

  @IsNumber()
  availableFunding: number;

  @IsString()
  @IsOptional()
  differentFundingVehicles: string;

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

  @IsNumber()
  userId: number;

  @IsArray()
  sectors: number[];

  @IsArray()
  subSectors: number[];
}
