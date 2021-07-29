import { Controller, Get, Query, ParseIntPipe} from '@nestjs/common';
import { HealthCheckService, 
    HttpHealthIndicator, 
    HealthCheck, 
    TypeOrmHealthIndicator, 
    MicroserviceHealthIndicator,
    MemoryHealthIndicator
} from '@nestjs/terminus';
import { Transport, RedisOptions } from '@nestjs/microservices';
import { HttpQueryParams, MicroserviceQueryParams, RabbitMQQueryParams, MemoryQueryParams } from './dto'


@Controller('health')
export class HealthCheckController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private db: TypeOrmHealthIndicator,
    private microservice: MicroserviceHealthIndicator,
    private memory: MemoryHealthIndicator
  ) {}

  @Get('http')
  @HealthCheck()
  async httpCheck(@Query() queryParams: HttpQueryParams) {
    try{
      const healthCheck = await this.health.check([
        () => this.http.pingCheck('health', queryParams.url),
      ]);
      return {
        result: healthCheck.info.health
      }
    }catch(err){
      return {
        result: {
          status: "down"
        }
      }
    }
  }

  @Get('database')
  @HealthCheck()
  async databaseCheck() {
     try{
      const healthCheck = await this.health.check([
        async () => this.db.pingCheck('typeorm')
      ]);
      console.log(healthCheck);
      return {
        result: healthCheck.info.typeorm
      }
    }catch(err){
      return {
        result: {
          status: "down"
        }
      }
    }
  }

  @Get('microservice/tcp')
  @HealthCheck()
  async microserviceCheck(@Query() queryParams: MicroserviceQueryParams) {
    try{
      const healthCheck = await this.health.check([
        async () =>
          this.microservice.pingCheck('tcp', {
            transport: Transport.TCP,
            options: { host: queryParams.host, port: queryParams.port },
          })
      ]);
      return {
        result: healthCheck.info.tcp
      }
    }catch(err){
      return {
        result: {
          status: "down"
        }
      }
    } 
  }

  @Get('microservice/rabbitmq')
  @HealthCheck()
  async rabbitMqCheck(@Query() queryParams: RabbitMQQueryParams) {
    console.log(queryParams.url);
    try{
      const healthCheck = await this.health.check([
        async () =>
          this.microservice.pingCheck('rmq', {
            transport: Transport.RMQ,
            options: {
              urls: queryParams.url
            }
          })
      ]);
      return {
        result: healthCheck.info.rmq
      }
    }catch(err){
      return {
        result: {
          status: "down"
        }
      }
    } 
  }

  @Get('memory')
  @HealthCheck()
  async memoryCheck(@Query() queryParams: MemoryQueryParams) {
    try{
      const healthCheck = await this.health.check([
        async () => this.memory.checkHeap('memory_heap', queryParams.heap),
      ]);
      return {
        result: healthCheck.info.memory
      }
    }catch(err){
      return {
        result: {
          status: "down"
        }
      }
    } 
  }
}