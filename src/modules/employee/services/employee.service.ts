import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from '../entities/employee.entity';
import { CreateEmployeeDto } from '../dto/create-employee.dto'

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private EmployeeRepository: Repository<Employee>) {}

  async findAll(): Promise<Employee[]> {
    return this.EmployeeRepository.find({ relations: ["department"] });
  }

  async findOne(id: number): Promise<Employee> {
    return this.EmployeeRepository.findOne(id);
  }

  async create(employee: CreateEmployeeDto): Promise<any> {
    return this.EmployeeRepository.save(employee);
  }
}
