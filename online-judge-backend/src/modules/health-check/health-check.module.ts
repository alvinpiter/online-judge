import { Module } from '@nestjs/common';
import { QueueModule } from '../queue/queue.module';
import { HealthCheckController } from './health-check.controller';

@Module({
  imports: [QueueModule],
  controllers: [HealthCheckController],
})
export class HealthCheckModule {}
