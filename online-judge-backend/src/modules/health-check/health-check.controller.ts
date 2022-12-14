import { Controller, Get, Inject } from '@nestjs/common';
import { ConfigKey } from 'src/config';

@Controller('api')
export class HealthCheckController {
  constructor(
    @Inject(ConfigKey.APP_CREATOR_NAME) private readonly appCreatorName: string,
  ) {}

  @Get('health-check')
  healthCheck() {
    return { health: 'OK' };
  }

  @Get('app-info')
  getAppInfo() {
    return { appCreatorName: this.appCreatorName };
  }
}
