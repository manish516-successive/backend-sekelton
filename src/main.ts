import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './common/interceptors/transform.interceptor'
import { ExceptionFilter } from './common/filters/exception.filter'
import { BadRequestException } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: true });
  app.useGlobalPipes(new ValidationPipe({transform: true, exceptionFactory: (errors) => new BadRequestException(errors)}));
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new ExceptionFilter());
  await app.listen(3000);
}
bootstrap();
