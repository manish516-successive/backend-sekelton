import { Module } from '@nestjs/common';
import { EmployeeService } from '../employee/employee.service';
import { EmployeeController } from '../employee/employee.controller'
import { Employee } from '../employee/employee.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forFeature([Employee])],
  controllers: [EmployeeController],
  providers: [ EmployeeService ],
  exports: [TypeOrmModule]
})
export class EmployeeModule {}
