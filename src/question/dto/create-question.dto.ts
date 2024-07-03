import { IsEnum, IsNumber, IsString } from "class-validator";
import { QuestionType } from "../question.type";

export class CreateQuestionDto {
    @IsString()
    text: string;

    @IsEnum(QuestionType)
    type: QuestionType;

    @IsNumber()
    order: number;

    @IsNumber()
    subSectionId: number;
}
