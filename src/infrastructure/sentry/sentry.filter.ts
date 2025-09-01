import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as Sentry from '@sentry/node';
import { SENTRY_SERVICE } from './sentry.module';

@Catch()
export class SentryFilter implements ExceptionFilter {
  constructor(@Inject(SENTRY_SERVICE) private readonly sentry: typeof Sentry) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let error = 'InternalServerError';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      
      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        const responseObj = exceptionResponse as any;
        message = responseObj.message || responseObj.error || message;
        error = responseObj.error || exception.constructor.name;
      }
    } else if (exception instanceof Error) {
      message = exception.message;
      error = exception.constructor.name;
    }

    // Only capture non-HTTP errors or server errors (5xx) with Sentry
    if (!(exception instanceof HttpException) || status >= 500) {
      this.sentry.captureException(exception, {
        tags: {
          method: request.method,
          url: request.url,
          statusCode: status.toString(),
        },
        extra: {
          requestBody: request.body,
          requestParams: request.params,
          requestQuery: request.query,
          userAgent: request.get('User-Agent'),
        },
      });
    }

    // Log error for development
    if (process.env.NODE_ENV === 'development') {
      console.error(`❌ ${request.method} ${request.url} - ${status} ${error}:`, message);
      if (exception instanceof Error && exception.stack) {
        console.error(exception.stack);
      }
    }

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      error,
      message,
    };

    response.status(status).json(errorResponse);
  }
}