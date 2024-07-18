import { IsDate, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class CreateMobileDto {

    @IsNumber()
    @MinLength(9)
    phoneNo?: number;

    @IsString()
    @IsOptional()
    isVerified?: string;

    @IsString()
    otp: string;

   /* @IsNumber()
    userId: number; */

    @IsDate()
    @IsOptional()
    createdAt?: Date;

    @IsString()
    @IsOptional()
    updatedAt?: Date;


}
