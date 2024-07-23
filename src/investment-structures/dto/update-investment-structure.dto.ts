import { PartialType } from '@nestjs/mapped-types';
import { CreateInvestmentStructureDto } from './create-investment-structure.dto';

export class UpdateInvestmentStructureDto extends PartialType(CreateInvestmentStructureDto) {}
