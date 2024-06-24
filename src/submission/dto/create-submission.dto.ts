import { IsInt, IsArray, ValidateNested, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { IsAnswerExists, IsQuestionExists } from '../../shared/validators/custom.validator';
import { Optional } from '@nestjs/common';


export class CreateSubmissionDto {
  @IsInt()
  userId: number;

  @IsInt()
  @IsQuestionExists()
  questionId: number;

  @IsInt()
  @IsAnswerExists()
  answerId: number;

  @Optional()
  @IsString()
  text: string;
}

export class CreateMultipleSubmissionsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSubmissionDto)
  submissions: CreateSubmissionDto[];
}
