import { IsInt, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { IsAnswerExists, IsQuestionExists } from '../../shared/validators/custom.validator';


export class CreateSubmissionDto {
  @IsInt()
  userId: number;

  @IsInt()
  @IsQuestionExists()
  questionId: number;

  @IsInt()
  @IsAnswerExists()
  answerId: number;
}

export class CreateMultipleSubmissionsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSubmissionDto)
  submissions: CreateSubmissionDto[];
}
