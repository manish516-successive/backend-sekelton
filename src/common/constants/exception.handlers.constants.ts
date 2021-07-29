import { BadRequestException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { ExceptionHandlers } from '../utils/exception.handlers'

export const ExceptionsWithHandlersDetails = [{
	type: BadRequestException,
	handler: new ExceptionHandlers().badRequestExceptionFormat
}];

export const GenericExceptionHandler = new ExceptionHandlers().genericExceptionFormat;