# Backend Skeleton With MongodB Connectivity

- [Database Connectivity with mongodb Using TypeORM](#database-connectivity-using-typeorm)
- [Config Change](#config-change)


### Database Connectivity With Mongodb Using TypeORM

Typeorm can also used to connect with mongodb

- Connection: For Connection with Mongodb, Backend Skeleton use .env files. Please refer [Config Change](#config-change) to know how to define Database credentials for mongodb
- Entity: Defining entities and columns is almost the same as in relational databases, the main difference is that we must use @ObjectIdColumn instead of @PrimaryColumn or @PrimaryGeneratedColumn
- Service: Backend Skeleton interacts with enities though services i.e [employee service](https://github.com/manish516-successive/backend-skeleton/blob/typeorm-with-mongodb/src/modules/employee/services/employee.service.ts) interacts with [employee repository](https://github.com/manish516-successive/backend-skeleton/blob/typeorm-with-mongodb/src/modules/employee/entities/employee.entity.ts)
- Relationship: TypeOrm does not any inbuild support for relationship for mongodb, but backend-skeleton can implement reference based relationship by defining objectId between entities. For Following Database structure

```
Table employee as E {
  id int [pk, increment] // auto-increment
  name varchar
  designation varchar
  department_id integer
}

Table department {
  id int [pk]
  name varchar
 }

// Creating references
// You can also define relaionship separately
// > many-to-one; < one-to-many; - one-to-one
Ref: E.department_id > department.id  

```
backend skeleton define following entities

- Employee Entity

```
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
}`
```
- Department Entity

```
import { Entity, Column, ObjectIdColumn,ObjectID } from 'typeorm';
import { Employee } from "../../employee/entities/employee.entity";


@Entity()
export class Department {
  @ObjectIdColumn()
  _id: ObjectID

  @Column()
  name: string;
}
```

backend skeleton uses $lookup to fetch data from another collections in following manner

```
async findAll(): Promise<any[]> {
    const employeeRepository = getMongoRepository(Employee);

    return await employeeRepository.aggregate([
        {
            $lookup:
            {
                from: 'department',
                localField: 'departmentId',
                foreignField: '_id',
                as: 'department'
            }
        }
    ]).toArray();
  }
```
### Config change

Backend Skeleton use .env file for each environment i,e For Dev Env it used dev.env and for Test Env it use test.env file. 

Sample .env file for development file

```
NODE_ENV=dev
DB_TYPE=<DB_TYPE>
DB_HOST=<DB_HOST>
DB_PORT=<DB_PORT>
DB_USERNAME=<DB_USERNAME>
DB_PASSWORD=<DB_PASSWORD>
DB_NAME=<DB_NAME>
```
