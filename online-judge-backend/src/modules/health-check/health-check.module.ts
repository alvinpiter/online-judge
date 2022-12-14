import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigKey } from 'src/config';
import { HealthCheckController } from './health-check.controller';

@Module({
  controllers: [HealthCheckController],
  providers: [
    {
      provide: ConfigKey.APP_CREATOR_NAME,
      useFactory: (configService: ConfigService) => {
        return configService.get(ConfigKey.APP_CREATOR_NAME);
      },
      inject: [ConfigService],
    },
  ],
})
export class HealthCheckModule {}
