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
  httpCheck(@Query() queryParams: HttpQueryParams) {
    return this.health.check([
      () => this.http.pingCheck('health', queryParams.url),
    ]);
  }

  @Get('database')
  @HealthCheck()
  databaseCheck() {
    return this.health.check([
      async () => this.db.pingCheck('typeorm')
    ]);
  }

  @Get('microservice/tcp')
  @HealthCheck()
  microserviceCheck(@Query() queryParams: MicroserviceQueryParams) {
    return this.health.check([
      async () =>
        this.microservice.pingCheck('tcp', {
          transport: Transport.TCP,
          options: { host: queryParams.host, port: queryParams.port },
        })
    ]);
  }

  @Get('microservice/rabbitmq')
  @HealthCheck()
  rabbitMqCheck(@Query() queryParams: RabbitMQQueryParams) {
    return this.health.check([
      async () =>
        this.microservice.pingCheck('rmq', {
          transport: Transport.RMQ,
          options: {
            urls: queryParams.url
          }
        })
    ]);
  }

  @Get('memory')
  @HealthCheck()
  memoryCheck(@Query() queryParams: MemoryQueryParams) {
    return this.health.check([
        async () => this.memory.checkHeap('memory_heap', queryParams.heap),
    ]);
  }
}