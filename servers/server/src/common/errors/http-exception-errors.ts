import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
  Inject,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { ConfigService } from '@nestjs/config';

class BaseHttpException {
  constructor(
    public statusCode: number,
    public message: string | object,
    public path: string,
    public timestamp = new Date().toISOString(),
  ) {}
}

@Catch()
export class HttpExceptionsErrorHandler implements ExceptionFilter {
  private logger = new Logger('ErrorHandler💥');

  constructor(@Inject(ConfigService) private configService: ConfigService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();

    const isDev = this.configService.get<string>('NODE_ENV') !== 'production';
    this.logger.log(isDev, 'Environment');
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | object = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.getResponse();
    } else if (exception instanceof QueryFailedError) {
      const pgError = exception as QueryFailedError & {
        code?: string;
        detail?: string;
        message?: string;
      };

      if (pgError && typeof pgError === 'object' && 'code' in pgError) {
        if (pgError.code === '23505') {
          status = HttpStatus.CONFLICT;
          message = {
            error: 'Duplicate key error',
            detail: isDev ? pgError.detail : undefined,
          };
        } else if (pgError.code === '23503') {
          status = HttpStatus.BAD_REQUEST;
          message = {
            error: 'Foreign key violation',
            detail: isDev ? pgError.detail : undefined,
          };
        } else if (pgError.code === '23514') {
          status = HttpStatus.BAD_REQUEST;
          message = {
            error: 'Check constraint violation',
            detail: isDev ? pgError.detail : undefined,
          };
        } else {
          status = HttpStatus.BAD_REQUEST;
          message = isDev
            ? {
                error: 'Database error',
                detail: pgError,
              }
            : { error: 'Database error' };
        }
      }
    } else if (exception instanceof Error) {
      message = isDev ? exception.message : 'Internal server error';
    }

    this.logger.error(exception);

    const errorResponse = new BaseHttpException(status, message, request.url);
    response.status(status).json(errorResponse);
  }
}
