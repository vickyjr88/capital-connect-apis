import { Injectable } from '@nestjs/common';
import { CreateInvestmentStructureDto } from './dto/create-investment-structure.dto';
import { UpdateInvestmentStructureDto } from './dto/update-investment-structure.dto';

@Injectable()
export class InvestmentStructuresService {
  create(createInvestmentStructureDto: CreateInvestmentStructureDto) {
    return 'This action adds a new investmentStructure';
  }

  findAll() {
    return `This action returns all investmentStructures`;
  }

  findOne(id: number) {
    return `This action returns a #${id} investmentStructure`;
  }

  update(id: number, updateInvestmentStructureDto: UpdateInvestmentStructureDto) {
    return `This action updates a #${id} investmentStructure`;
  }

  remove(id: number) {
    return `This action removes a #${id} investmentStructure`;
  }
}
