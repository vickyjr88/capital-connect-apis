import { Test, TestingModule } from '@nestjs/testing';
import { RegistrationStructuresController } from './registration-structures.controller';
import { RegistrationStructuresService } from './registration-structures.service';

describe('RegistrationStructuresController', () => {
  let controller: RegistrationStructuresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegistrationStructuresController],
      providers: [RegistrationStructuresService],
    }).compile();

    controller = module.get<RegistrationStructuresController>(RegistrationStructuresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
