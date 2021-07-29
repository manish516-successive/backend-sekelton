import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from '../entities/department.entity';
import { CreateDepartmentDto } from '../dto/create-department.dto'

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private DepartmentRepository: Repository<Department>) {}

  async findAll(): Promise<Department[]> {
    return this.DepartmentRepository.find({ relations: ["employees"] });
  }

  async findOne(id: number): Promise<Department> {
    return this.DepartmentRepository.findOne(id);
  }

  async create(department: CreateDepartmentDto): Promise<any> {
    return this.DepartmentRepository.save(department);
  }
}
