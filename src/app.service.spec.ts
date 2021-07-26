import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';

describe('AppService', () => {
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    appService = module.get<AppService>(AppService);
  });

  it('AppService - should be defined', () => {
    expect(appService).toBeDefined();
  });

  describe('getHello', () => {
    it('should return Hello World', async () => {
      expect(appService.getHello()).toEqual("Hello World!");
    });
  });
});
