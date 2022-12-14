import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ConfigKey } from 'src/config';
import { PingDto } from './ping.dto';

@Controller('api')
export class HealthCheckController {
  constructor(
    @Inject(ConfigKey.APP_CREATOR_NAME) private readonly appCreatorName: string,
  ) {}

  @Get('health-check')
  healthCheck() {
    return { health: 'OK' };
  }

  @Post('ping')
  async ping(@Body() pingDto: PingDto) {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return { message: `Hi, ${pingDto.message}!` };
  }

  @Get('app-info')
  getAppInfo() {
    return { appCreatorName: this.appCreatorName };
  }
}
