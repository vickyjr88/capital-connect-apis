import { IsEnum, IsOptional, IsString, MinLength } from "class-validator"
import { ScoringType } from "../scoring.type";

export class CreateScoringDto {
    @IsString()
    @MinLength(5)
    score: string;

    @IsString()
    @MinLength(5)
    comment: string;

    @IsString()
    @IsOptional()
    implication?: string;

    @IsString()
    @IsOptional()
    action?: string;

    @IsString()
    @IsOptional()
    recommendation?: string;

    @IsEnum(ScoringType)
    type: ScoringType;
}
