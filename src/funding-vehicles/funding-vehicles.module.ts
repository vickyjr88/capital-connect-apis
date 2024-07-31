import { Module } from '@nestjs/common';
import { FundingVehiclesService } from './funding-vehicles.service';
import { FundingVehiclesController } from './funding-vehicles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FundingVehicle } from './entities/funding-vehicle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FundingVehicle])],
  controllers: [FundingVehiclesController],
  providers: [FundingVehiclesService],
})
export class FundingVehiclesModule {}
