import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Sentry from '@sentry/node';

export const SENTRY_SERVICE = 'SENTRY_SERVICE';

@Global()
@Module({
  providers: [
    {
      provide: SENTRY_SERVICE,
      useFactory: (configService: ConfigService) => {
        const sentryDsn = configService.get<string>('sentry.dsn');
        const environment = configService.get<string>('sentry.environment');
        const nodeEnv = configService.get<string>('app.nodeEnv');
        
        if (sentryDsn) {
          Sentry.init({
            dsn: sentryDsn,
            environment,
            tracesSampleRate: nodeEnv === 'production' ? 0.1 : 1.0,
            integrations: [
              new Sentry.Integrations.Http({ tracing: true }),
              new Sentry.Integrations.Express(),
            ],
            beforeSend(event) {
              // Filter out sensitive information
              if (event.request?.headers) {
                delete event.request.headers.authorization;
                delete event.request.headers.cookie;
              }
              return event;
            },
          });
          
          console.log('✅ Sentry initialized successfully');
        } else {
          console.log('⚠️ Sentry DSN not configured, skipping initialization');
        }
        
        return Sentry;
      },
      inject: [ConfigService],
    },
  ],
  exports: [SENTRY_SERVICE],
})
export class SentryModule {}