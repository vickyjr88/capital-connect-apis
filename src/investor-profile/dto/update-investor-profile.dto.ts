import { PartialType } from '@nestjs/mapped-types';
import { CreateInvestorProfileDto } from './create-investor-profile.dto';

export class UpdateInvestorProfileDto extends PartialType(CreateInvestorProfileDto) {}
