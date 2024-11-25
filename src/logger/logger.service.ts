import { LoggerService, Injectable, OnModuleInit } from '@nestjs/common';
import { config } from 'dotenv';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
config();

@Injectable()
export class MyLogger implements LoggerService, OnModuleInit {
  private logger: winston.Logger;

  constructor() {
    const logLevel = this.getLogLevel();
    this.logger = winston.createLogger({
      level: logLevel,
      levels: winston.config.npm.levels,
      transports: [
        new winston.transports.DailyRotateFile({
          dirname: 'logs',
          filename: 'application-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          maxSize: process.env.LOG_FILE_MAX_SIZE,
          maxFiles: process.env.MAX_FILES,
        }),

        new winston.transports.DailyRotateFile({
          dirname: 'logs',
          filename: 'error-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          level: 'error',
          maxSize: process.env.LOG_FILE_MAX_SIZE_ERROR,
          maxFiles: process.env.MAX_FILES,
        }),

        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp(),
            winston.format.printf(
              ({ timestamp, level, message }) =>
                `${timestamp} [${level}]: ${message}`,
            ),
          ),
        }),
      ],
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(
          ({ timestamp, level, message }) =>
            `${timestamp} [${level}]: ${message}`,
        ),
      ),
    });
  }

  private getLogLevel(): string {
    const levels = [
      'error',
      'warn',
      'info',
      'http',
      'verbose',
      'debug',
      'silly',
    ];
    const logLevelIndex = parseInt(process.env.LOG_LEVEL, 10);
    return levels[Math.min(logLevelIndex, levels.length - 1)];
  }

  log(message: any, ...optionalParams: any[]) {
    this.logger.info(message, ...optionalParams);
  }

  error(message: any, ...optionalParams: any[]) {
    this.logger.error(message, ...optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    this.logger.warn(message, ...optionalParams);
  }

  debug?(message: any, ...optionalParams: any[]) {
    this.logger.debug(message, ...optionalParams);
  }

  verbose?(message: any, ...optionalParams: any[]) {
    this.logger.verbose(message, ...optionalParams);
  }

  onModuleInit() {
    process.on('uncaughtException', (error) => {
      this.error('Uncaught Exception:', error.stack || error.message);
    });

    process.on('unhandledRejection', (reason) => {
      this.error('Unhandled Rejection:', reason);
    });
  }
}
