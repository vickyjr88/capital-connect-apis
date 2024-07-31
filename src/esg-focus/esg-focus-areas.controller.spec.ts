import { Test, TestingModule } from '@nestjs/testing';
import { EsgFocusAreasController } from './esg-focus-areas.controller';
import { EsgFocusAreasService } from './esg-focus-areas.service';

describe('EsgFocusAreasController', () => {
  let controller: EsgFocusAreasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EsgFocusAreasController],
      providers: [EsgFocusAreasService],
    }).compile();

    controller = module.get<EsgFocusAreasController>(EsgFocusAreasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
