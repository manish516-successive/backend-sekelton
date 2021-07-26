import { Controller, Get, Param, ParseIntPipe, Post, UsePipes, Body} from '@nestjs/common';
import { DepartmentService } from './services/department.service';
import { Department } from './entities/department.entity';
import { CreateDepartmentDto } from './create-department.dto'
import { ValidationPipe } from '../common/pipes/validation.pipe'
import { LoggingService } from "../logging/logging.service"


@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService,
    private readonly loogingService: LoggingService) {}

  @Get()
  async getDepartments(): Promise<Department[]> {
    this.loogingService.log("Fetching Department Data from controller");
    return await this.departmentService.findAll();
  }

  @Get(':id')
  async getDepartment(@Param('id', ParseIntPipe) id: number): Promise<Department>{
    return this.departmentService.findOne(id);
  }

  @Post()
  async saveDepartment(@Body(new ValidationPipe()) createDepartmentDto: CreateDepartmentDto): Promise<any> {
    return this.departmentService.create(createDepartmentDto);
  }
}
