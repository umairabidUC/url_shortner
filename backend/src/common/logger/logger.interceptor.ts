import { CallHandler, ExecutionContext, HttpException, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, catchError, map, throwError } from 'rxjs';
import { LoggerService } from './logger.service';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(private readonly loggerService: LoggerService) { }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    this.logRequest(request);

    return next.handle().pipe(
      map((res: unknown) => this.responseHandler(res, context))
    );
  }

  private logRequest(request: any) {
    const { method, url, headers } = request;
    const userAgent = headers['user-agent'];
    const host = headers['host'];
    this.loggerService.log(
      `Request - ${method} ${url} - Host: ${host} - User-Agent: ${userAgent}`,
      'Request'
    );
  }

  private logResponse(response: any, request: any) {
    const { method, url } = request;
    const statusCode = response.statusCode;

    this.loggerService.log(
      `Response - ${method} ${url} - Status: ${statusCode}`,
      'Response'
    );
  }


  private responseHandler(res: any, context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    this.logResponse(response, request);

    return {
      status: true,
      path: request.url,
      statusCode: response.statusCode,
      result: res,
    };
  }
}
