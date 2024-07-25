import { Test, TestingModule } from '@nestjs/testing';
import { InvestmentStructuresService } from './investment-structures.service';

describe('InvestmentStructuresService', () => {
  let service: InvestmentStructuresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvestmentStructuresService],
    }).compile();

    service = module.get<InvestmentStructuresService>(InvestmentStructuresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
