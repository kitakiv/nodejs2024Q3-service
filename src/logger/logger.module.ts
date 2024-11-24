import { Module } from '@nestjs/common';
import { MyLogger as LoggerService } from './logger.service';

@Module({
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
