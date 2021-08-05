# Backend Skeleton

Backend Skeleton is based on NestJs Framework. 

### Features/Modules

- [Database Connectivity Using TypeORM](#database-connectivity-using-typeorm)
- [Logging each Request/Response with co-releation-id/sub-co-releation-id](#logging)
- [Validation Using DTO (Data Transfer Object)](#validation)
- [HTTP, Microservices, Database Health Checks](#health-checks)
- [Unified Structure for rest api responses for success and errors](#unified-structure-for-rest-api-responses)
- [Unit and e2e test cases setup with coverage](#unit-and-integration-test-cases)

### Guidelines

- [Directory Structure](#directory-structure)
- [File Naming Format](#file-naming-format)
- [Config File](#config-file)

### Installation
 - [Using NPM](#using-npm)


### Database Connectivity Using TypeORM

This Backend Skeleton uses Typeorm For Database Connectivity and Database operation.TypeOrm can connects with multiple databases like mysql, posgresql and mongodb.For MongoDB,  Please refer [mongo-db-connectivity](https://github.com/manish516-successive/backend-skeleton/tree/mongo-db-connectivity) branch

- Connection: For Connection with DB, Backend Skeleton use .env files. Please refer [Config File](#config-file) to know how to define Database credentials
- Enitity : TypeORM supports the repository design pattern, so each entity/database tables has its own repository i.e for employee table, it needs [employee repository](https://github.com/manish516-successive/backend-skeleton/blob/main/src/modules/employee/entities/employee.entity.ts). For more information , please refer this [link](https://typeorm.io/#/entities)
- Service: Backend Skeleton interacts with enities though services i.e [employee service](https://github.com/manish516-successive/backend-skeleton/blob/main/src/modules/employee/services/employee.service.ts) interacts with [employee repository](https://github.com/manish516-successive/backend-skeleton/blob/main/src/modules/employee/entities/employee.entity.ts)
- Releationship: TypeOrm Support multiple options to implememt releationship . Backend Skeleton demonstrate one to many releationship between Employee and Department Tables with following Structure
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
- Migrations: WIP

Nest Js also supports another orm modules, Please refer  follwing if you want to use any other orm other than TypeOrm

- [For Sequelize](https://github.com/manish516-successive/sequelize-sekelton)
- [For Mongoose](https://github.com/manish516-successive/mongoose-sekelton)


### Logging 

For Logging , Backend Skeleton use [successive-nestjs-logger](https://www.npmjs.com/package/successive-nestjs-logger) node module. Successive nest js logger is a http Json logger based on pino-http. Please refer this [link](https://www.npmjs.com/package/successive-nestjs-logger) to check how to use this node module  

### Validation

Backend Skeleton use NestJS Validation Module with DTO apporach to validate incoming API payloads and Query Parameters.

- Data Transfer Object: To validate API Request Payload , Backend Skeleton needs a DTO and then Backend Skeleton combines it with [class-valiator](https://github.com/typestack/class-validator). Sample DTO for Employee Class

```
import { IsString, IsInt } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  name: string;

  @IsString()
  designation: string;
}

```
For this DTO, Backend Skeleton validates that each employee object must have 2 properties name and designation and Both the properties must be string.

- NestJs Validation module : Backend Skeleton used NestJs validation to validate DTO. Please refer [validation module](https://docs.nestjs.com/pipes) for information


### Health Checks

### Unified Structure For Rest Api Responses

### Unit and Integration Test cases

### Directory Structure

### File Naming Format

### Config File

### Using NPM



