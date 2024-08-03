import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    constructor(private readonly loggerService: LoggerService) {}
  
    catch(exception: unknown, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const request = ctx.getRequest();
  
      const status =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
  
      const message = exception instanceof HttpException
        ? (typeof exception.getResponse() === 'string'
            ? exception.getResponse()
            : JSON.stringify(exception.getResponse()))
        : 'Internal server error';
  
      // Log the error without the stack trace
      this.loggerService.error(
        `Error - ${request.method} ${request.url} - Status: ${status} - Message: ${message}`,
        undefined, // Pass undefined to omit stack trace
        'ExceptionFilter',
        'ExceptionHandler'
      );
  
      if (!response.headersSent) {
        response.status(status).json({
          statusCode: status,
          timestamp: new Date().toISOString(),
          path: request.url,
          method: request.method,
          message: typeof message === 'string' ? message : (message as any).message,
        });
      }
    }
  }
