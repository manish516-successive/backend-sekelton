import { IsString, IsInt } from 'class-validator';
import { ObjectID } from 'typeorm';


export class CreateEmployeeDto {
  @IsString()
  name: string;

  @IsString()
  designation: string;

  departmentName?: string
}