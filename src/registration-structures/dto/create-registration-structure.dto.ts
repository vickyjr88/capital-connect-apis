import { IsOptional, IsString, MinLength } from "class-validator";

export class CreateRegistrationStructureDto {
    @IsString()
    @MinLength(3)
    title: string;

    @IsString()
    @IsOptional()
    description?: string;
}
