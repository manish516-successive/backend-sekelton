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

- Data Transfer Object: To validate API Request Payload , Backend Skeleton needs a DTO and then Backend Skeleton combines it with [class-valiator](https://github.com/typestack/class-validator). 

- NestJs Validation module : Backend Skeleton used NestJs validation to validate DTO. Please refer [validation module](https://docs.nestjs.com/pipes) for information

  #### How to Use validation Module
  
  - Define a DTO class. Sample DTO Class
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

  - Associate DTO with a api request in the controller
    ```
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
    ```
   - Register NestJs Validation Module. In Nest Js we can register Validation Module either globally or locally
     - Globally in the main.ts file
       ```
       import { NestFactory } from '@nestjs/core';
       import { AppModule } from './app.module';
       import { ValidationPipe } from '@nestjs/common';

       async function bootstrap() {
         const app = await NestFactory.create(AppModule, { logger: false });
         app.useGlobalPipes(new ValidationPipe({transform: true)}));
         await app.listen(3000);
       }
       bootstrap();

       ```
     - Locally in the controller file
       ```
       @Post()
       async saveDepartment(@Body(new ValidationPipe()) createDepartmentDto: CreateDepartmentDto): Promise<any> {
         return this.departmentService.create(createDepartmentDto);
       }
       ```
Note: Backend Skeleton also exposed custom validation pipe, we can use it to override inbuild validation module.

### Health Checks

### Unified Structure For Rest Api Responses

Backend Skeleton uses unified structure for all api responses for success and failures

- Success : For Success it will return result in the following form.
```
{
    "status": "success",
    "message": "Data is fetched successfully",
    "data": {
        "result": [
            {
                "id": 109,
                "name": "test",
                "designation": "test",
                "department": null
            }
        ],
        "count": 1
    }
}
```
it will return count only if result is a array 

- Failure : For Failure it will return result in the following form.

```
{
    "status": "error",
    "message": "BadRequestException",
    "error": [
        {
            "entity": "name",
            "message": [
                "name must be a string"
            ]
        }
    ]
}
```

### Unit and Integration Test cases

Backend Skeleton uses Jest Framework to run unit and e2e test cases. Each service/controller consists of its corresponding test case file with a extension of .spec.ts. e2e test cases are under src/tests folder

commands:

- Unit cases: npm run test
- Unit cases with coverage: npm run test:cov
- e2e test cases: npm run test:e2e 

### Directory Structure

### File Naming Format

### Config File

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
DB_SYNCHRONIZE=<DB_SYNCHRONIZE>
DEBUG_LOGS=true
```
DEBUG_LOGS config is use to enable/disable debug logs and rest of the config is used by TypeOrm to connect with Database

### Using NPM

Backend Skeleton uses npm as a package manager.Use following commands to start backend skeleton

```
npm install
npm start
```



