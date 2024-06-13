import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateFileDto {

    @IsString()
    @IsNotEmpty()
    logo: string;

}