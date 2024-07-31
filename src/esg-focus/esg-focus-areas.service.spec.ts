import { Test, TestingModule } from '@nestjs/testing';
import { EsgFocusAreasService } from './esg-focus-areas.service';

describe('EsgFocusAreasService', () => {
  let service: EsgFocusAreasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EsgFocusAreasService],
    }).compile();

    service = module.get<EsgFocusAreasService>(EsgFocusAreasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
