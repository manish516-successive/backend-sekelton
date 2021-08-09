import {
  ExceptionFilter as NestJsExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { ExceptionsWithHandlersDetails, GenericExceptionHandler } from "../constants/exception-handlers.constants"

@Catch()
export class ExceptionFilter implements NestJsExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    let responseObject;
  
    ExceptionsWithHandlersDetails.forEach(function(ExceptionsWithHandlersDetail){
      if (exception instanceof ExceptionsWithHandlersDetail.type){
        responseObject = ExceptionsWithHandlersDetail.handler(exception, request.method);
      }
    });

    if(!responseObject){
      responseObject = GenericExceptionHandler(exception, request.method);
    }

    response.status(responseObject.statusCode).json(responseObject.json);
  }
}