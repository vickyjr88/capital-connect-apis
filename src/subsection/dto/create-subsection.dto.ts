import { IsNumber, MinLength } from "class-validator";

export class CreateSubsectionDto {
    @MinLength(3)
    name: string;

    @IsNumber()
    sectionId: number;
}
