import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerInterceptor } from './common/logger/logger.interceptor';
import { LoggerService } from './common/logger/logger.service';
import { AllExceptionsFilter } from './common/exception_handling/all_exception_filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter(new LoggerService))
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalInterceptors(new LoggerInterceptor(new LoggerService))
  app.enableCors()
  await app.listen(3500);
}
bootstrap();
