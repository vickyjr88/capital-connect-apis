import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { ScoringService } from './scoring.service';
import { CreateScoringDto } from './dto/create-scoring.dto';
import { UpdateScoringDto } from './dto/update-scoring.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decorator';

@Controller('scorings')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ScoringController {
  constructor(private readonly scoringsService: ScoringService) {}

  @Post()
  @Roles(Role.Admin)
  create(@Body() createScoringDto: CreateScoringDto) {
    return this.scoringsService.create(createScoringDto);
  }

  @Get()
  findAll() {
    return this.scoringsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scoringsService.findOne(+id);
  }

  @Put(':id')
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updateScoringDto: UpdateScoringDto) {
    return this.scoringsService.update(+id, updateScoringDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.scoringsService.remove(+id);
  }
}
