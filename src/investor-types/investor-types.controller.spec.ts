import { Test, TestingModule } from '@nestjs/testing';
import { InvestorTypesController } from './investor-types.controller';
import { InvestorTypesService } from './investor-types.service';

describe('InvestorTypesController', () => {
  let controller: InvestorTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvestorTypesController],
      providers: [InvestorTypesService],
    }).compile();

    controller = module.get<InvestorTypesController>(InvestorTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
