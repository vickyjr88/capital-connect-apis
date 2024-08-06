import { PartialType } from '@nestjs/mapped-types';
import { CreateEsgFocusAreaDto } from './create-esg-focus-area.dto';

export class UpdateEsgFocusAreaDto extends PartialType(CreateEsgFocusAreaDto) {}
