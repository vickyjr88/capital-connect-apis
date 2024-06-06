import { IsNumber, IsString } from "class-validator";

export class CreateQuestionDto {
    @IsString()
    text: string;

    @IsNumber()
    subSectionId: number;
}
