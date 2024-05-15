import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './product.controller';
import { ProductService } from './product.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [ProductService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.get({ id: '1' })).toBe('Hello 1');
    });
  });
});
