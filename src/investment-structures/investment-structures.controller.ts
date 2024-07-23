import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InvestmentStructuresService } from './investment-structures.service';
import { CreateInvestmentStructureDto } from './dto/create-investment-structure.dto';
import { UpdateInvestmentStructureDto } from './dto/update-investment-structure.dto';

@Controller('investment-structures')
export class InvestmentStructuresController {
  constructor(private readonly investmentStructuresService: InvestmentStructuresService) {}

  @Post()
  create(@Body() createInvestmentStructureDto: CreateInvestmentStructureDto) {
    return this.investmentStructuresService.create(createInvestmentStructureDto);
  }

  @Get()
  findAll() {
    return this.investmentStructuresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.investmentStructuresService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInvestmentStructureDto: UpdateInvestmentStructureDto) {
    return this.investmentStructuresService.update(+id, updateInvestmentStructureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.investmentStructuresService.remove(+id);
  }
}
