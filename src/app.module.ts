import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule, LoggingModule, HealthCheckModule, DepartmentModule } from './modules/';
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
