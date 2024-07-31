import { Test, TestingModule } from '@nestjs/testing';
import { RegistrationStructuresService } from './registration-structures.service';

describe('RegistrationStructuresService', () => {
  let service: RegistrationStructuresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegistrationStructuresService],
    }).compile();

    service = module.get<RegistrationStructuresService>(RegistrationStructuresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
