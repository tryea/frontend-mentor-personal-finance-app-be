import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import type { NestExpressApplication } from '@nestjs/platform-express';
import * as session from 'express-session';
import { AppModule } from './app.module';
import { REDIS_CLIENT } from './infrastructure/redis/redis.module';
import { createSessionConfig } from './infrastructure/config/session.config';
import { SentryInterceptor } from './infrastructure/sentry/sentry.interceptor';
import { SentryFilter } from './infrastructure/sentry/sentry.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const redisClient = app.get(REDIS_CLIENT);

  // Configure CORS
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:63904',
      'https://fm-finance-app.ersaptaaristo.dev',
      'https://fm-finance-be.ersaptaaristo.dev'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  });

  // Configure session middleware
  const sessionConfig = createSessionConfig(configService, redisClient);
  app.use(session(sessionConfig));

  // Add Sentry interceptor and filter globally
  app.useGlobalInterceptors(new SentryInterceptor(app.get('SENTRY_SERVICE')));
  app.useGlobalFilters(new SentryFilter(app.get('SENTRY_SERVICE')));

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // API prefix
  const apiPrefix = configService.get<string>('apiPrefix') || 'api/v1';
  app.setGlobalPrefix(apiPrefix);

  // Swagger documentation
  const swaggerConfig = configService.get('swagger');
  const config = new DocumentBuilder()
    .setTitle(swaggerConfig.title)
    .setDescription(swaggerConfig.description)
    .setVersion(swaggerConfig.version)
    .addBearerAuth()
    .addTag('auth', 'Authentication endpoints')
    .addTag('users', 'User management endpoints')
    .addTag('transactions', 'Transaction management endpoints')
    .addTag('budgets', 'Budget management endpoints')
    .addTag('pots', 'Savings pot management endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${apiPrefix}/docs`, app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  // Get port from configuration
  const port = configService.get<number>('port', 3000);
  
  await app.listen(port);
  console.log(`🚀 Application is running on: http://localhost:${port}/${apiPrefix}`);
  console.log(`📚 Swagger documentation: http://localhost:${port}/${apiPrefix}/docs`);
}

bootstrap().catch((error) => {
  console.error('❌ Error starting server:', error);
  process.exit(1);
});
