import { Injectable } from '@nestjs/common';
import { logger } from './winston.config';

@Injectable()
export class LoggerService {

  log(message: string, context: string, handler?: string) {
    logger.info(message, { context, handler });
  }

  error(message: string, trace: string | undefined, context: string, handler?: string) {
    
      logger.error(message, { context, trace, handler }); 
  }

  warn(message: string, context: string, handler?: string) {
    logger.warn(message, { context, handler });
  }

  debug(message: string, context: string, handler?: string) {
    logger.debug(message, { context, handler });
  }
}
