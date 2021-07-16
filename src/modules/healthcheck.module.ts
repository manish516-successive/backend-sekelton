import { Module } from '@nestjs/common';
import { HealthCheckController } from '../healthcheck/healthcheck.controller';
import { TerminusModule } from '@nestjs/terminus';


@Module({
  imports: [TerminusModule],
  controllers: [HealthCheckController],
  providers: []
})
export class HealthCheckModule {}
