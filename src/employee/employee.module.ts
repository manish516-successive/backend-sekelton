import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { EmployeeProviders } from './employee.providers';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [EmployeeController],
  providers: [
    ...EmployeeProviders,
    EmployeeService,
  ],
})
export class EmployeeModule {}