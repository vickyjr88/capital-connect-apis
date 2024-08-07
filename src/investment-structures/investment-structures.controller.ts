import { Controller, Get, Post, Body, Param, Delete, Query, Put, NotFoundException, BadRequestException, HttpCode, HttpStatus } from '@nestjs/common';
import { InvestmentStructuresService } from './investment-structures.service';
import { CreateInvestmentStructureDto } from './dto/create-investment-structure.dto';
import { UpdateInvestmentStructureDto } from './dto/update-investment-structure.dto';
import throwInternalServer from 'src/shared/utils/exceptions.util';

@Controller('investment-structures')
export class InvestmentStructuresController {
  constructor(private readonly investmentStructuresService: InvestmentStructuresService) {}

  @Post()
  create(@Body() createInvestmentStructureDto: CreateInvestmentStructureDto) {
    try {
      return this.investmentStructuresService.create(createInvestmentStructureDto);
    } catch (error) {
      throwInternalServer(error)
    }
  }

  @Get()
  findAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.investmentStructuresService.findAll(page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.investmentStructuresService.findOne(+id);
    } catch (error) {
      throwInternalServer(error)
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateInvestmentStructureDto: UpdateInvestmentStructureDto) {
    try {
      await this.investmentStructuresService.findOne(+id);
      const investment = await this.investmentStructuresService.update(+id, updateInvestmentStructureDto);
      return investment;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new BadRequestException(`Investment structure with id ${id} not found`);
      }
      throwInternalServer(error)
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    try {
      await this.investmentStructuresService.remove(+id);
    } catch (error) {
      throwInternalServer(error)
    }
  }
}
