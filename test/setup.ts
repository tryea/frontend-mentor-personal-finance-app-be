import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from '../src/infrastructure/config/configuration';

// Test environment setup
export function setupTestEnvironment() {
  process.env.NODE_ENV = 'test';
  process.env.DATABASE_URL = process.env.TEST_DATABASE_URL || 'postgresql://test:test@localhost:5432/test_db';
  process.env.REDIS_HOST = process.env.TEST_REDIS_HOST || 'localhost';
  process.env.REDIS_PORT = process.env.TEST_REDIS_PORT || '6379';
}

// Helper function to create test module
export async function createTestingModule(imports: any[] = [], providers: any[] = []): Promise<TestingModule> {
  const moduleBuilder = Test.createTestingModule({
    imports: [
      ConfigModule.forRoot({
        load: [configuration],
        isGlobal: true,
        envFilePath: ['.env.test', '.env'],
      }),
      ...imports,
    ],
    providers,
  });

  return moduleBuilder.compile();
}

// Helper function to create test app
export async function createTestApp(module: TestingModule): Promise<INestApplication> {
  const app = module.createNestApplication();
  await app.init();
  return app;
}

// Helper function to cleanup test app
export async function cleanupTestApp(app: INestApplication): Promise<void> {
  if (app) {
    await app.close();
  }
}