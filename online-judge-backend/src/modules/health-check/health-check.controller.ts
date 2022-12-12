import { Controller, Get } from '@nestjs/common';

@Controller('api')
export class HealthCheckController {
  @Get('health-check')
  healthCheck() {
    return { message: 'OK' };
  }
}
