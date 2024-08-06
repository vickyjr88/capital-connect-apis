import { PartialType } from '@nestjs/mapped-types';
import { CreateMobileNumberDto } from './create-mobile-number.dto';

export class UpdateMobileNumberDto extends PartialType(CreateMobileNumberDto) {}
