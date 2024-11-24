import { LoggerService, Injectable } from '@nestjs/common';
import { config } from 'dotenv';
config();

@Injectable()
export class MyLogger implements LoggerService {
  private formatMessage(
    level: string,
    message: any,
    ...optionalParams: any[]
  ): string {
    const timestamp = new Date().toISOString();
    const context =
      optionalParams.length > 0 ? `[${optionalParams.join(' ')}]` : '';
    return `${timestamp} [${level}] ${context} ${message}`;
  }

  log(message: any, ...optionalParams: any[]) {
    console.log(
      this.formatMessage(process.env.LOG, message, ...optionalParams),
    );
  }

  fatal(message: any, ...optionalParams: any[]) {
    console.error(
      this.formatMessage(process.env.FATAL, message, ...optionalParams),
    );
  }

  error(message: any, ...optionalParams: any[]) {
    console.error(
      this.formatMessage(process.env.ERROR, message, ...optionalParams),
    );
  }

  warn(message: any, ...optionalParams: any[]) {
    console.warn(
      this.formatMessage(process.env.WARN, message, ...optionalParams),
    );
  }

  debug?(message: any, ...optionalParams: any[]) {
    console.debug(
      this.formatMessage(process.env.DEBUG, message, ...optionalParams),
    );
  }

  verbose?(message: any, ...optionalParams: any[]) {
    console.info(
      this.formatMessage(process.env.VERBOSE, message, ...optionalParams),
    );
  }

  onModuleInit() {
    process.on('uncaughtException', (error) => {
      this.fatal('Uncaught Exception', error.stack || error.message || error);
    });

    process.on('unhandledRejection', (reason, promise) => {
      this.fatal('Unhandled Rejection', 'Reason:', reason, 'Promise:', promise);
    });
  }
}
