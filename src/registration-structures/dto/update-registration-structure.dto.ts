import { PartialType } from '@nestjs/mapped-types';
import { CreateRegistrationStructureDto } from './create-registration-structure.dto';

export class UpdateRegistrationStructureDto extends PartialType(CreateRegistrationStructureDto) {}
