import { Test, TestingModule } from '@nestjs/testing';
import { UseOfFundsController } from './use-of-funds.controller';
import { UseOfFundsService } from './use-of-funds.service';

describe('UseOfFundsController', () => {
  let controller: UseOfFundsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UseOfFundsController],
      providers: [UseOfFundsService],
    }).compile();

    controller = module.get<UseOfFundsController>(UseOfFundsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
