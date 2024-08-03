import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { LoggerInterceptor } from './logger.interceptor';

@Module({
  providers: [LoggerService, LoggerInterceptor],
  exports: [LoggerService,LoggerInterceptor]
})
export class LoggerModule {}
