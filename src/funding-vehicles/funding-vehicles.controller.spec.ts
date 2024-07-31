import { Test, TestingModule } from '@nestjs/testing';
import { FundingVehiclesController } from './funding-vehicles.controller';
import { FundingVehiclesService } from './funding-vehicles.service';

describe('FundingVehiclesController', () => {
  let controller: FundingVehiclesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FundingVehiclesController],
      providers: [FundingVehiclesService],
    }).compile();

    controller = module.get<FundingVehiclesController>(FundingVehiclesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
