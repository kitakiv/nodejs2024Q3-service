import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { MyLogger as LoggerService } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new LoggerService();
  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log(
      `\nMETHOD: ${req.method}\nURL: ${
        (req.url, null, 2)
      }\nBODY: ${JSON.stringify(req.body, null, 2)}\nPARAMS: ${JSON.stringify(
        req.params,
        null,
        2,
      )}\nQUERY: ${JSON.stringify(req.query, null, 2)}\nSTATUS: ${
        res.statusCode
      }\n`,
    );
    next();
  }
}
