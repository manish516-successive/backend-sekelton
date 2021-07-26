import { Controller, Get, Param, ParseIntPipe, Post, UsePipes, Body} from '@nestjs/common';
import { EmployeeService } from './services/employee.service';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeDto } from './create-employee.dto'
import { ValidationPipe } from '../common/pipes/validation.pipe'
import { LoggingService } from "../logging/logging.service"


@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService,
    private readonly loogingService: LoggingService) {}

  @Get()
  async getEmployees(): Promise<Employee[]> {
    this.loogingService.debug("Fetching Employee Data from controller");
    return await this.employeeService.findAll();
  }

  @Get(':id')
  async getEmployee(@Param('id', ParseIntPipe) id: number): Promise<Employee>{
    return this.employeeService.findOne(id);
  }

  @Post()
  async saveEmployee(@Body(new ValidationPipe()) createEmployeeDto: CreateEmployeeDto): Promise<any> {
    console.log(createEmployeeDto);
    return this.employeeService.create(createEmployeeDto);
  }
}
