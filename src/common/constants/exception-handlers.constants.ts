 import { BadRequestException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { ExceptionUtil } from '../utils/exception.util'

export const ExceptionsWithHandlersDetails = [{
	type: BadRequestException,
	handler: new ExceptionUtil().badRequestExceptionFormat
}];

export const GenericExceptionHandler = new ExceptionUtil().genericExceptionFormat;