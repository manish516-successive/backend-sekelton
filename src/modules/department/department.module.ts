import { Module } from '@nestjs/common';
import { DepartmentService } from './services/department.service';
import { DepartmentController } from './department.controller'
import { Department } from './entities/department.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeModule } from '../employee/employee.module'


@Module({
  imports: [TypeOrmModule.forFeature([Department]), EmployeeModule],
  controllers: [DepartmentController],
  providers: [ DepartmentService ],
  exports: [TypeOrmModule]
})
export class DepartmentModule {}
