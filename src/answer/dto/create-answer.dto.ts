import { IsNumber, IsString } from "class-validator";

export class CreateAnswerDto {
    @IsString()
    text: string;

    @IsNumber()
    weight: number;

    @IsNumber()
    questionId: number;
}
