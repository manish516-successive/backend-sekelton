import { BadRequestException, HttpStatus, HttpException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { ValidationError } from '@nestjs/common';

interface ExceptionResponseObject {
  statusCode: number
  message: ValidationError[] | string
  error: string
}

type ExceptionType = 
  | BadRequestException
  | NotFoundException
  | InternalServerErrorException

export class ExceptionHandlers {
	badRequestExceptionFormat(exception: BadRequestException, method: string) : object{
		let errors = [];
		let responseObject : ExceptionResponseObject;
		responseObject = <ExceptionResponseObject>exception.getResponse(); 

		if(typeof responseObject.message !== "string"){
			responseObject.message.forEach(function(errorObject){
				errors.push({
					entity: errorObject.property,
					message: Object.values(errorObject.constraints)			
				})
			});
		}

		return { 
			statusCode: exception.getStatus(),
			json : {
				status: "error",
				message: Object.getPrototypeOf(exception).constructor.name,
				error: typeof responseObject.message === "string" ? responseObject.message: errors
			}
		};
	}

	genericExceptionFormat(exception: any, method: string): object{
		return { 
			statusCode: exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR,
			json : {
				status: "error",
				message: Object.getPrototypeOf(exception).constructor.name,
				error: exception.message
			}
		};
	}
}