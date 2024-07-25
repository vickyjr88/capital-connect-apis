import { IsOptional, IsString, MinLength } from "class-validator";

export class CreateInvestmentStructureDto {
    @IsString()
    @MinLength(3)
    title: string;

    @IsString()
    @IsOptional()
    description?: string;
}
