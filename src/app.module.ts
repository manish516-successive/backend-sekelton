import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule, LoggingModule, HealthCheckModule } from './modules/';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forRoot(), EmployeeModule, LoggingModule.forRoot(), HealthCheckModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule  {}
