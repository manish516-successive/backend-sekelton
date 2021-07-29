import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './modules/employee/employee.module';
import { DepartmentModule } from './modules/department/department.module';
import { LoggingModule } from './modules/logging/logging.module';
import { HealthCheckModule } from './modules/healthcheck/healthcheck.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig } from './common/configs/database.config'

@Module({
  imports: [ConfigModule.forRoot() , 
            TypeOrmModule.forRoot(
              databaseConfig
            ),
            EmployeeModule, 
            DepartmentModule,
            LoggingModule.forRoot(), 
            HealthCheckModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule  {}
