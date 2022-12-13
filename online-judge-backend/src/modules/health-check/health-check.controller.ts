import { Body, Controller, Get, Post } from '@nestjs/common';
import { PingDto } from './ping.dto';

@Controller('api')
export class HealthCheckController {
  @Get('health-check')
  healthCheck() {
    return { health: 'OK' };
  }

  @Post('ping')
  async ping(@Body() pingDto: PingDto) {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return { message: `Hi, ${pingDto.message}!` };
  }
}
