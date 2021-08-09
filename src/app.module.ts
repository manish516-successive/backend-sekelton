import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './modules/employee/employee.module';
import { DepartmentModule } from './modules/department/department.module';
import { LoggerModule } from 'successive-nestjs-logger';
import { HealthCheckModule } from './modules/healthcheck/healthcheck.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfig } from './common/configs/database.config'
import { LoggerConfig } from './common/configs/logger.config'


@Module({
  imports: [ConfigModule.forRoot() , 
            TypeOrmModule.forRoot(
              DatabaseConfig
            ),
            EmployeeModule, 
            DepartmentModule,
            LoggerModule.forRoot(LoggerConfig), 
            HealthCheckModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule  {}
