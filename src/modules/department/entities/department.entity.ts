import { Entity, Column, ObjectIdColumn,ObjectID } from 'typeorm';
import { Employee } from "../../employee/entities/employee.entity";


@Entity()
export class Department {
  @ObjectIdColumn()
  _id: ObjectID

  @Column()
  name: string;
}