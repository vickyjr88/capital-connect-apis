import { IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class CreateSubsectionDto {
    @MinLength(3)
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    sectionId: number;
}
