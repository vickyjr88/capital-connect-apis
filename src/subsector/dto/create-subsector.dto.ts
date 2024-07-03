import { IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class CreateSubSectorDto {
    @MinLength(3)
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    sectorId: number;
}
