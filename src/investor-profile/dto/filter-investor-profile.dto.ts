import {
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  IsNumber,
} from 'class-validator';

export class FilterInvestorProfilesDto {
  @IsArray()
  @IsOptional()
  countriesOfInvestmentFocus?: string[];

  @IsString()
  @IsOptional()
  headOfficeLocation?: string;

  @IsEmail()
  @IsOptional()
  emailAddress?: string;

  @IsString()
  @IsOptional()
  contactPerson?: string;

  @IsArray()
  @IsOptional()
  useOfFunds?: string[];

  @IsNumber()
  @IsOptional()
  maximumFunding?: number;

  @IsNumber()
  @IsOptional()
  minimumFunding?: number;

  @IsArray()
  @IsOptional()
  sectors?: number[];

  @IsArray()
  @IsOptional()
  subSectors?: number[];

  @IsArray()
  @IsOptional()
  businessGrowthStages?: string[];

  @IsString()
  @IsOptional()
  investorType?: string;

  @IsArray()
  @IsOptional()
  investmentStructures?: string[];

  @IsArray()
  @IsOptional()
  esgFocusAreas?: string[];

  @IsArray()
  @IsOptional()
  registrationStructures?: string[];
}
