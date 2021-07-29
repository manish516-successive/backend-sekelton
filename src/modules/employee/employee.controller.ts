import { Controller, Get, Param, ParseIntPipe, Post, UsePipes, Body} from '@nestjs/common';
import { EmployeeService } from './services/employee.service';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto'
import { LoggingService } from "../logging/logging.service"
import { InternalServerErrorException } from '@nestjs/common';



@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService,
    private readonly loggingService: LoggingService) {}

  @Get()
  async getEmployees(): Promise<Employee[]> {
    try{
      this.loggingService.debug("Fetching Employee Data from controller");
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
