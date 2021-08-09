import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getMongoRepository } from 'typeorm';
import { Employee } from '../entities/employee.entity';
import { CreateEmployeeDto } from '../dto/create-employee.dto'
import { DepartmentService } from "../../department/services/department.service"


@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private EmployeeRepository: Repository<Employee>,
    private readonly departmentService: DepartmentService
  ) {}

  async findAll(): Promise<any[]> {
    const employeeRepository = getMongoRepository(Employee);

    return await employeeRepository.aggregate([
        {
            $lookup:
            {
                from: 'department',
                localField: 'departmentId',
                foreignField: '_id',
                as: 'department'
            }
        }
    ]).toArray();
  }

  async findOne(id: number): Promise<Employee> {
    return this.EmployeeRepository.findOne(id);
  }

  async create(employee: CreateEmployeeDto): Promise<any> {
    const depatment = await this.departmentService.findWhere({
      name: employee.departmentName
    });

    const employeeEntity: Employee = Employee.create();
    const {name, designation } = employee;
    employeeEntity.name = name;
    employeeEntity.designation = designation;
    employeeEntity.departmentId = depatment[0]._id;
    await Employee.save(employeeEntity);
    return employeeEntity;
  }
}