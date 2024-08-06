import { Test, TestingModule } from '@nestjs/testing';
import { MobileNumberController } from './mobile-number.controller';

import { MobileService } from "./mobile-number.service";

describe('MobileController', () => {
  let controller: MobileNumberController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MobileNumberController],
      providers: [MobileService],
    }).compile();

    controller = module.get<MobileNumberController>(MobileNumberController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
