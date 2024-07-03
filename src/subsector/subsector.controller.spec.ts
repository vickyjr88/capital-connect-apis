import { Test, TestingModule } from '@nestjs/testing';
import { SubSectorController } from './subsector.controller';
import { SubSectorService } from './subsector.service';

describe('SubsectionController', () => {
  let controller: SubSectorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubSectorController],
      providers: [SubSectorService],
    }).compile();

    controller = module.get<SubSectorController>(SubSectorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
