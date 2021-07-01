import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { LoggingModule } from "./logging/logging.module"


@Module({
  imports: [EmployeeModule, LoggingModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule  {}
