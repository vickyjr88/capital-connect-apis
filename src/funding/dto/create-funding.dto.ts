import { IsInt, IsNotEmpty, Max, Min } from "class-validator";

export class CreateFundingDto {
    @IsInt()
    @IsNotEmpty()
    @Min(1000)
    minFunding: number;
  
    @IsInt()
    @IsNotEmpty()
    @Max(100000000)
    maxFunding: number;
}
