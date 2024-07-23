import { IsOptional, IsString, MinLength } from "class-validator";

export class CreateStageDto {
    @IsString()
    @MinLength(3)
    title: string;

    @IsString()
    @IsOptional()
    description?: string;
}
