import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigKey, ConfigSchema } from './config';
import { GlobalErrorFilter } from './errors/GlobalErrorFilter';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { HealthCheckModule } from './modules/health-check/health-check.module';
import { JobModule } from './modules/job/job.module';
import { ObjectStorageModule } from './modules/object-storage/object-storage.module';
import { ProblemsModule } from './modules/problems/problems.module';
import { StatisticsModule } from './modules/statistics/statistics.module';
import { SubmissionsModule } from './modules/submissions/submissions.module';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalErrorFilter,
    },
  ],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: ConfigSchema,
      validationOptions: { abortEarly: true },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>(ConfigKey.DATABASE_HOST),
        port: configService.get<number>(ConfigKey.DATABASE_PORT),
        database: configService.get<string>(ConfigKey.DATABASE_NAME),
        username: configService.get<string>(ConfigKey.DATABASE_USERNAME),
        password: configService.get<string>(ConfigKey.DATABASE_PASSWORD),
        synchronize: false,
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    CacheModule.register({ isGlobal: true }),
    JobModule,
    HealthCheckModule,
    AuthenticationModule,
    ObjectStorageModule,
    ProblemsModule,
    SubmissionsModule,
    StatisticsModule,
  ],
})
export class AppModule {}
