import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Inject,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import * as Sentry from '@sentry/node';
import { SENTRY_SERVICE } from './sentry.module';

@Injectable()
export class SentryInterceptor implements NestInterceptor {
  constructor(@Inject(SENTRY_SERVICE) private readonly sentry: typeof Sentry) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, user } = request;

    // Set user context if available
    if (user) {
      this.sentry.setUser({
        id: user.id,
        email: user.email,
      });
    }

    // Set request context
    this.sentry.setTag('method', method);
    this.sentry.setTag('url', url);
    this.sentry.setContext('request', {
      method,
      url,
      headers: this.sanitizeHeaders(request.headers),
    });

    return next.handle().pipe(
      tap(() => {
        // Log successful requests in development
        if (process.env.NODE_ENV === 'development') {
          console.log(`✅ ${method} ${url} - Success`);
        }
      }),
      catchError((error) => {
        // Capture error with Sentry
        this.sentry.captureException(error, {
          tags: {
            method,
            url,
          },
          extra: {
            requestBody: request.body,
            requestParams: request.params,
            requestQuery: request.query,
          },
        });

        console.error(`❌ ${method} ${url} - Error:`, error.message);
        return throwError(() => error);
      }),
    );
  }

  private sanitizeHeaders(headers: any): any {
    const sanitized = { ...headers };
    delete sanitized.authorization;
    delete sanitized.cookie;
    delete sanitized['x-api-key'];
    return sanitized;
  }
}