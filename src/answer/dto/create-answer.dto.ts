import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateAnswerDto {
    @IsString()
    text: string;

    @IsString()
    @IsOptional()
    recommendation: string;

    @IsNumber()
    weight: number;

    @IsNumber()
    questionId: number;
}
