import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Controller, Get } from '@nestjs/common';
import { Redis } from 'ioredis';

@Controller('api')
export class HealthCheckController {
  constructor(@InjectRedis() private readonly redisClient: Redis) {}

  @Get('health-check')
  healthCheck() {
    return { health: 'OK' };
  }

  @Get('/redis/ping')
  async redisPing() {
    return this.redisClient.ping();
  }
}
