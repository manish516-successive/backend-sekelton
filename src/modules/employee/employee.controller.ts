import { Controller, Get, Param, ParseIntPipe, Post, UsePipes, Body} from '@nestjs/common';
import { EmployeeService } from './services/employee.service';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto'
import { InternalServerErrorException } from '@nestjs/common';
import { LoggerService } from 'successive-nestjs-logger'


@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService,
    private readonly loggerService: LoggerService) {}

  @Get()
  async getEmployees(): Promise<Employee[]> {
    try{
      return await this.employeeService.findAll();
    }catch(err){
      throw new InternalServerErrorException(err);
    } 
  }

  @Get(':id')
  async getEmployee(@Param('id', ParseIntPipe) id: number): Promise<Employee>{
    try{
      return this.employeeService.findOne(id);
    }catch(err){
      throw new InternalServerErrorException(err);
    }
  }

  @Post()
  async saveEmployee(@Body() createEmployeeDto: CreateEmployeeDto): Promise<{ message: string; result: Employee; }> {
    try{
      const employee = await this.employeeService.create(createEmployeeDto);
      return {
        message: "Employee Info saved successfully",
        result: employee
      };    
    }catch(err){
      throw new InternalServerErrorException(err);
    }
  }
}
