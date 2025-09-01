import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { setupTestEnvironment, createTestApp, cleanupTestApp } from '../setup';

// Declare Bun test globals
declare global {
  function describe(name: string, fn: () => void): void;
  function it(name: string, fn: () => void | Promise<void>): void;
  function beforeAll(fn: () => void | Promise<void>): void;
  function afterAll(fn: () => void | Promise<void>): void;
  function expect(actual: any): {
    toBeDefined(): void;
    toBe(expected: any): void;
  };
}

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let module: TestingModule;

  beforeAll(async () => {
    setupTestEnvironment();
    
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = await createTestApp(module);
  });

  afterAll(async () => {
    await cleanupTestApp(app);
    await module.close();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  it('should have proper configuration', async () => {
    const configService = app.get('ConfigService');
    expect(configService).toBeDefined();
    
    const port = configService.get('port');
    expect(port).toBeDefined();
    expect(typeof port).toBe('number');
  });

  it('should have modules loaded', () => {
    // Test that the app has the necessary modules without direct service access
    expect(app.get('ConfigService')).toBeDefined();
  });

  it('should have redis module loaded', () => {
    const redisClient = app.get('REDIS_CLIENT');
    expect(redisClient).toBeDefined();
  });

  it('should have sentry service loaded', () => {
    const sentryService = app.get('SENTRY_SERVICE');
    expect(sentryService).toBeDefined();
  });
});