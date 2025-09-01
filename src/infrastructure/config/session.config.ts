import { ConfigService } from '@nestjs/config';
import * as session from 'express-session';
import RedisStore from 'connect-redis';
import { RedisClientType } from 'redis';

export function createSessionConfig(
  configService: ConfigService,
  redisClient: RedisClientType,
): session.SessionOptions {
  const sessionSecret = configService.get<string>('session.secret');
  
  if (!sessionSecret) {
    throw new Error('Session secret is not configured');
  }

  return {
    store: new RedisStore({ client: redisClient }),
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: configService.get<string>('app.nodeEnv') === 'production',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      sameSite: 'strict',
    },
    name: 'sessionId',
  };
}