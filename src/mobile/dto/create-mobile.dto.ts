import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateMobileDto {

@IsNumber()
@IsOptional()
phoneNo?: number;

@IsString()
@IsOptional()
isVerified?: string;

@IsString()
otp: string;

@IsDate()
@IsOptional()
createdAt?: Date;

@IsString()
@IsOptional()
updatedAt?: Date;
}
