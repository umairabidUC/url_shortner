import * as winston from 'winston';
import 'winston-daily-rotate-file';

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.printf(({ timestamp, level, message, context, trace, handler }) => {
          return `${timestamp} [${context}, ${handler}] ${level}: ${message}${trace ? `\n${trace}` : ''}`;
        }),
      ),
    }),
  ],
});

if (process.env.APP_MODE === 'PROD') {
  logger.add(new winston.transports.DailyRotateFile({
    level: 'info',
    filename: 'logs/info-level-logs-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
    ),
  }));

  logger.add(new winston.transports.DailyRotateFile({
    level: 'warn',
    filename: 'logs/warn-level-logs-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
    ),
  }));

  logger.add(new winston.transports.DailyRotateFile({
    level: 'error',
    filename: 'logs/error-level-logs-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
    ),
  }));
}
