import { Module } from '@nestjs/common';
import { SectorService } from './sector.service';
import { SectorController } from './sector.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sector } from './entities/sector.entity';
import { SubSectorService } from 'src/subsector/subsector.service';
import { SubSector } from 'src/subsector/entities/subsector.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sector, SubSector])],
  controllers: [SectorController],
  providers: [SectorService, SubSectorService],
})
export class SectorModule {}
