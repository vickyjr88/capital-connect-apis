import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvestorProfileService } from './investor-profile.service';
import { InvestorProfileController } from './investor-profile.controller';
import { InvestorProfile } from './entities/investor-profile.entity';
import { Sector } from '../sector/entities/sector.entity';
import { SubSector } from '../subsector/entities/subsector.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InvestorProfile, Sector, SubSector])],
  controllers: [InvestorProfileController],
  providers: [InvestorProfileService],
  exports: [InvestorProfileService],
})
export class InvestorProfileModule {}
