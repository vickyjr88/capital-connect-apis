import { IsOptional, IsString, MinLength } from "class-validator";

export class CreateEsgFocusAreaDto {
    @IsString()
    @MinLength(3)
    title: string;

    @IsString()
    @IsOptional()
    description?: string;
}
