import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateMobileNumberDto {
  @IsString()
  @MinLength(9)
  phoneNo: string;

  @IsBoolean()
  @IsOptional()
  isVerified?: boolean;

  @IsString()
  otp: string;

  @IsNumber()
  userId: number;

  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @IsString()
  @IsOptional()
  updatedAt?: Date;
}
