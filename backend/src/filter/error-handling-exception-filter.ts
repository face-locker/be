import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class LoggingExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let details: string | undefined = undefined;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        const responseObj = exceptionResponse as Record<string, unknown>;
        message =
          (typeof responseObj.message === 'string'
            ? responseObj.message
            : undefined) || exception.message;
        details =
          (typeof responseObj.error === 'string'
            ? responseObj.error
            : undefined) ||
          (typeof responseObj.message === 'string'
            ? responseObj.message
            : undefined);
      } else {
        message = exception.message;
      }
    } else if (exception instanceof Error) {
      message = exception.message;
      Logger.error(message, exception);
    }

    const errorResponse: {
      statusCode: number;
      timestamp: string;
      path: string;
      message: string;
      details?: string;
    } = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    };

    if (details) {
      errorResponse.details = details;
    }

    response.status(status).json(errorResponse);
  }
}
