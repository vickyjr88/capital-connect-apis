import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvestorProfileService } from './investor-profile.service';
import { InvestorProfileController } from './investor-profile.controller';
import { InvestorProfile } from './entities/investor-profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InvestorProfile])],
  controllers: [InvestorProfileController],
  providers: [InvestorProfileService],
})
export class InvestorProfileModule {}
