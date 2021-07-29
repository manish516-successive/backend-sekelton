import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Department } from "../../department/entities/department.entity";


@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  designation: string;

  @ManyToOne(() => Department, department => department.employees)
  department: Department;
}
