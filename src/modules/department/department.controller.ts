import { Controller, Get, Param, ParseIntPipe, Post, UsePipes, Body} from '@nestjs/common';
import { DepartmentService } from './services/department.service';
import { Department } from './entities/department.entity';
import { CreateDepartmentDto } from './dto/create-department.dto'
import { ValidationPipe } from '../../common/pipes/validation.pipe'

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Get()
  async getDepartments(): Promise<Department[]> {
    return await this.departmentService.findAll();
  }

  @Get(':id')
  async getDepartment(@Param('id', ParseIntPipe) id: number): Promise<Department>{
    return this.departmentService.findOne(id);
  }

  @Post()
  async saveDepartment(@Body(new ValidationPipe()) createDepartmentDto: CreateDepartmentDto): Promise<any> {
    return await this.departmentService.create(createDepartmentDto);
  }
}
