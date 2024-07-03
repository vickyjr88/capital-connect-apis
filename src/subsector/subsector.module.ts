import { Module } from '@nestjs/common';
import { SubSectorService } from './subsector.service';
import { SubSectorController } from './subsector.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubSector } from './entities/subsector.entity';
import { Sector } from 'src/sector/entities/sector.entity';
import { SectorService } from 'src/sector/sector.service';

@Module({
  imports: [TypeOrmModule.forFeature([SubSector, Sector])],
  controllers: [SubSectorController],
  providers: [SubSectorService, SectorService],
})
export class SubSectorModule {}
