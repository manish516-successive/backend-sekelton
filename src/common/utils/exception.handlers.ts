import { BadRequestException, HttpStatus, HttpException, NotFoundException } from '@nestjs/common';

interface ExceptionResponseObject {
  statusCode: number
  message: String[]
  error: string
}

type ExceptionType = 
  | BadRequestException
  | NotFoundException

export class ExceptionHandlers {
	responseObjectBasedExceptionFormat(exception: ExceptionType) : object{
		let responseObject : ExceptionResponseObject;
		responseObject = <ExceptionResponseObject>exception.getResponse(); 
		return { 
			statusCode: responseObject.statusCode,
			json : {
				status: "error",
				message: responseObject.message,
				error: responseObject.error
			}
		};
	}

	genericExceptionFormat(exception: any): object{
		return { 
			statusCode: exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR,
			json : {
				status: "error",
				message: exception.message
			}
		};
	}
}