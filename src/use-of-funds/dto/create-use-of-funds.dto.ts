import { IsOptional, IsString, MinLength } from "class-validator";

export class CreateUseOfFundsDto {
    @IsString()
    @MinLength(3)
    title: string;

    @IsString()
    @IsOptional()
    description?: string;
}
