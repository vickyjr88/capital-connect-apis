import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, registerDecorator, ValidationOptions } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from 'src/question/entities/question.entity';
import { Answer } from 'src/answer/entities/answer.entity';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsQuestionExistsConstraint implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  async validate(questionId: number, args: ValidationArguments) {
    const entity = args.object.constructor
    const question = await this.questionRepository.findOneBy({ id: questionId });
    return !!question;
  }

  defaultMessage(args: ValidationArguments) {
    return `Question with ID ${args.value} does not exist`;
  }
}

@ValidatorConstraint({ async: true })
@Injectable()
export class IsAnswerExistsConstraint implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
  ) {}

  async validate(answerId: number, args: ValidationArguments) {
    const answer = await this.answerRepository.findOneBy({ id: answerId });
    return !!answer;
  }

  defaultMessage(args: ValidationArguments) {
    return `Answer with ID ${args.value} does not exist`;
  }
}

export function IsQuestionExists(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsQuestionExistsConstraint,
    });
  };
}

export function IsAnswerExists(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsAnswerExistsConstraint,
    });
  };
}
