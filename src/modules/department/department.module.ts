import { Module } from '@nestjs/common';
import { DepartmentService } from './services/department.service';
import { DepartmentController } from './department.controller'
import { Department } from './entities/department.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forFeature([Department])],
  controllers: [DepartmentController],
  providers: [ DepartmentService ],
  exports: [TypeOrmModule, DepartmentService]
})
export class DepartmentModule {}
