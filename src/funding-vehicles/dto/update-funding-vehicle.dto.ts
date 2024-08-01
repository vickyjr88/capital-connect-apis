import { PartialType } from '@nestjs/mapped-types';
import { CreateFundingVehicleDto } from './create-funding-vehicle.dto';

export class UpdateFundingVehicleDto extends PartialType(CreateFundingVehicleDto) {}
