import { Module } from '@nestjs/common';
import { DepartmentService } from '../department/services/department.service';
import { DepartmentController } from '../department/department.controller'
import { Department } from '../department/entities/department.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeModule } from './employee.module'


@Module({
  imports: [TypeOrmModule.forFeature([Department]), EmployeeModule],
  controllers: [DepartmentController],
  providers: [ DepartmentService ],
  exports: [TypeOrmModule]
})
export class DepartmentModule {}
