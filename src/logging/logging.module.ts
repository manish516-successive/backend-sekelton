import { Global, Module, DynamicModule, NestModule, MiddlewareConsumer} from "@nestjs/common";
import * as express from "express";
import * as pinoHttp from "pino-http";
import * as pino from "pino";
import { v4 } from "uuid";
import { setValue, middleware as ctxMiddleware } from "express-ctx";
import { LoggingService } from "./logging.service";
import { LOGGER_KEY } from "./constants";

@Global()
@Module({ providers: [LoggingService], exports: [LoggingService] })
export class LoggingModule implements NestModule {
  static forRoot(): DynamicModule {
    return {
      module: LoggingModule,
      providers: [LoggingService],
      exports: [LoggingService]
    };
  }

  configure(consumer: MiddlewareConsumer, ) {
   consumer.apply(ctxMiddleware, pinoHttp({
      logger: pino(),
      genReqId: function (req) { return v4() },
      serializers: {
        req(req) {
          req.body = req.raw.body;
          return req;
        },
      },
    }), bindLoggerMiddleware).forRoutes('*');
  }
}


function bindLoggerMiddleware(
  req: express.Request,
  _res: express.Response,
  next: express.NextFunction
) {
  setValue(LOGGER_KEY, req.log);
  next();
}
