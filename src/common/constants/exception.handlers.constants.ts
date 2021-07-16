import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ExceptionHandlers } from '../utils/exception.handlers'

export const ExceptionsWithHandlersDetails = [{
	type: BadRequestException,
	handler: new ExceptionHandlers().responseObjectBasedExceptionFormat
},
{
	type: NotFoundException,
	handler: new ExceptionHandlers().responseObjectBasedExceptionFormat
}];

export const GenericExceptionHandler = new ExceptionHandlers().genericExceptionFormat;