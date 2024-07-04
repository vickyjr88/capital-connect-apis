import { PartialType } from '@nestjs/mapped-types';
import { CreateSubSectorDto } from './create-subsector.dto';

export class UpdateSubSectorDto extends PartialType(CreateSubSectorDto) {}
