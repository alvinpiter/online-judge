import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { ConfigSchema } from './config';
import { ServerErrorFilter } from './errors/ServerErrorFilter';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { HealthCheckModule } from './modules/health-check/health-check.module';
import { ObjectStorageModule } from './modules/object-storage/object-storage.module';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: ServerErrorFilter,
    },
  ],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: ConfigSchema,
      validationOptions: { abortEarly: true },
    }),
    HealthCheckModule,
    AuthenticationModule,
    ObjectStorageModule,
  ],
})
export class AppModule {}
