import { Test, TestingModule } from '@nestjs/testing';
import { FundingVehiclesService } from './funding-vehicles.service';

describe('FundingVehiclesService', () => {
  let service: FundingVehiclesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FundingVehiclesService],
    }).compile();

    service = module.get<FundingVehiclesService>(FundingVehiclesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
