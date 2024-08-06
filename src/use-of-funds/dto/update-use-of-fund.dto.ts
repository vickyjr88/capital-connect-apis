import { PartialType } from '@nestjs/mapped-types';
import { CreateUseOfFundsDto } from './create-use-of-funds.dto';

export class UpdateUseOfFundsDto extends PartialType(CreateUseOfFundsDto) {}
