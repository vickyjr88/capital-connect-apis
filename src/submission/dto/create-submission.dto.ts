import { IsInt, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSubmissionDto {
  @IsInt()
  userId: number;

  @IsInt()
  questionId: number;

  @IsInt()
  answerId: number;
}

export class CreateMultipleSubmissionsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSubmissionDto)
  submissions: CreateSubmissionDto[];
}
