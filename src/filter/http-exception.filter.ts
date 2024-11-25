import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { MyLogger as LoggerService } from 'src/logger/logger.service';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message = exception.message;
    this.logger.error(
      `\nMETHOD: ${request.method} \nURL: ${
        request.url
      }\nBODY: ${JSON.stringify(
        request.body,
        null,
        2,
      )}\nQUERY: ${JSON.stringify(
        request.query,
        null,
        2,
      )}\nSTATUS: ${status}\nERROR_MESSAGE: ${message} `,
    );
    response.status(status).json({
      statusCode: status,
      message: status === 500 ? 'Internal Server Error' : message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
