import { Module } from '@nestjs/common';
import { EmployeeService } from '../employee/services/employee.service';
import { EmployeeController } from '../employee/employee.controller'
import { Employee } from '../employee/entities/employee.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forFeature([Employee])],
  controllers: [EmployeeController],
  providers: [ EmployeeService ],
  exports: [TypeOrmModule, EmployeeService]
})
export class EmployeeModule {}
