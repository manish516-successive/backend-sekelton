import { Module } from '@nestjs/common';
import { EmployeeService } from './services/employee.service';
import { EmployeeController } from './employee.controller'
import { Employee } from './entities/employee.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentModule } from '../department/department.module'



@Module({
  imports: [TypeOrmModule.forFeature([Employee]), DepartmentModule],
  controllers: [EmployeeController],
  providers: [ EmployeeService ],
  exports: [TypeOrmModule]
})
export class EmployeeModule {}
