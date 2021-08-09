import { Entity, Column, ObjectIdColumn,ObjectID, BaseEntity } from 'typeorm';
import { Department } from "../../department/entities/department.entity";


@Entity()
export class Employee extends BaseEntity {
  @ObjectIdColumn()
  _id: ObjectID

  @Column()
  name: string;

  @Column()
  designation: string;

  @ObjectIdColumn()
  departmentId: ObjectID
}