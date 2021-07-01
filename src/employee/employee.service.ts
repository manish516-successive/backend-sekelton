import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Employee } from './employee.entity';
import { CreateEmployeeDto } from './create-employee.dto'
import { LoggingService } from "../logging/logging.service"


@Injectable()
export class EmployeeService {
  constructor(
    @Inject('Employee_REPOSITORY')
    private EmployeeRepository: Repository<Employee>,
    private readonly loogingService: LoggingService
  ) {}

  async findAll(): Promise<Employee[]> {
    this.loogingService.log("Fetching Employee Data from service");
    return this.EmployeeRepository.find();
  }

  async findOne(id: number): Promise<Employee> {
    return this.EmployeeRepository.findOne(id);
  }

  async create(employee: CreateEmployeeDto): Promise<any> {
    return this.EmployeeRepository.save(employee);
  }
}
