import { IsOptional, IsString, MinLength } from "class-validator";

export class CreateSectionDto {
    @IsString()
    @MinLength(3)
    name: string;

    @IsString()
    @IsOptional()
    description?: string;
}
