import { LoggerService } from '@nestjs/common';
import { getValue } from "express-ctx";
import { LOGGER_KEY } from "../common/constants/logger.constants";


export class LoggingService implements LoggerService {
  log(message: string) {
    getValue(LOGGER_KEY).info(message);
  }
  error(message: string, trace: string) {
    getValue(LOGGER_KEY).error(message, trace);
  }
  warn(message: string) {
   getValue(LOGGER_KEY).warn(message);
  }
  debug(message: string) {
    getValue(LOGGER_KEY).debug(message);
  }
  verbose(message: string) {
   getValue(LOGGER_KEY).verbose(message);
  }
}

