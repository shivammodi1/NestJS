import { Test, TestingModule } from '@nestjs/testing';
import { MynameControllerController } from './myname-controller.controller';

describe('MynameControllerController', () => {
  let controller: MynameControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MynameControllerController],
    }).compile();

    controller = module.get<MynameControllerController>(MynameControllerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
