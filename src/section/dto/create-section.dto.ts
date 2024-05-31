import { MinLength } from "class-validator";

export class CreateSectionDto {
    @MinLength(3)
    name: string;
}
