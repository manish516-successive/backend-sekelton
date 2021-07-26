import { IsString, IsInt } from 'class-validator';

export class CreateDepartmentDto {
  @IsString()
  name: string;

  employees?: { id: number}[]
}