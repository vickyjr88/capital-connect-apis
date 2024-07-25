import { Test, TestingModule } from '@nestjs/testing';
import { InvestmentStructuresController } from './investment-structures.controller';
import { InvestmentStructuresService } from './investment-structures.service';

describe('InvestmentStructuresController', () => {
  let controller: InvestmentStructuresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvestmentStructuresController],
      providers: [InvestmentStructuresService],
    }).compile();

    controller = module.get<InvestmentStructuresController>(InvestmentStructuresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
