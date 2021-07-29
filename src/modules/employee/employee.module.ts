import { Module } from '@nestjs/common';
import { EmployeeService } from './services/employee.service';
import { EmployeeController } from './employee.controller'
import { Employee } from './entities/employee.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forFeature([Employee])],
  controllers: [EmployeeController],
  providers: [ EmployeeService ],
  exports: [TypeOrmModule, EmployeeService]
})
export class EmployeeModule {}
