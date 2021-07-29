import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';
import { LoggingService } from './logging.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction): void {
    const loggerService = new LoggingService();
    loggerService.log("request started");
    next();
  }
}