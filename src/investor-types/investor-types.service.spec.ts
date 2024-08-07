import { Test, TestingModule } from '@nestjs/testing';
import { InvestorTypesService } from './investor-types.service';

describe('InvestorTypesService', () => {
  let service: InvestorTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvestorTypesService],
    }).compile();

    service = module.get<InvestorTypesService>(InvestorTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
