import { Test, TestingModule } from '@nestjs/testing';
import { UseOfFundsService } from './use-of-funds.service';

describe('UseOfFundsService', () => {
  let service: UseOfFundsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UseOfFundsService],
    }).compile();

    service = module.get<UseOfFundsService>(UseOfFundsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
