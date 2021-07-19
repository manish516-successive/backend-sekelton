import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule, LoggingModule, HealthCheckModule } from './modules/';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DATABASE_CONFIG } from './common/configs/database.config'



@Module({
  imports: [ConfigModule.forRoot({
              isGlobal: true,
            }) , 
            TypeOrmModule.forRootAsync({
              useFactory: () => DATABASE_CONFIG
            }),
            EmployeeModule, 
            LoggingModule.forRoot(), 
            HealthCheckModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule  {}
