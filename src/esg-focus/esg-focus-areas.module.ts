import { Module } from '@nestjs/common';
import { EsgFocusAreasService } from './esg-focus-areas.service';
import { EsgFocusAreasController } from './esg-focus-areas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EsgFocusAreas } from './entities/esg-focus-areas.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EsgFocusAreas])],
  controllers: [EsgFocusAreasController],
  providers: [EsgFocusAreasService],
})
export class EsgFocusAreasModule {}
