import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { QuestionType } from "../question.type";

export class CreateQuestionDto {
    @IsString()
    text: string;

    @IsEnum(QuestionType)
    type: QuestionType;

    @IsNumber()
    @IsOptional()
    order: number;

    @IsString()
    @IsOptional()
    tooltip: string;

    @IsNumber()
    subSectionId: number;
}
