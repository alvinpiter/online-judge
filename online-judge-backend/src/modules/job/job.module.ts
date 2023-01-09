import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigKey } from 'src/config';
import { getRmqOptions } from './helpers';
import { JobController } from './job.controller';
import { JobService } from './job.service';

export const PRIMARY_JOB_QUEUE = 'primary';
export const SECONDARY_JOB_QUEUE = 'secondary';

const queueProviders = [PRIMARY_JOB_QUEUE, SECONDARY_JOB_QUEUE].map(
  (queue) => ({
    provide: queue,
    useFactory: (configService: ConfigService) => {
      const host = configService.get<string>(ConfigKey.RABBITMQ_HOST);
      const username = configService.get<string>(ConfigKey.RABBITMQ_USERNAME);
      const password = configService.get<string>(ConfigKey.RABBITMQ_PASSWORD);

      return ClientProxyFactory.create({
        transport: Transport.RMQ,
        options: getRmqOptions([host], username, password, queue),
      });
    },
    inject: [ConfigService],
  }),
);

@Module({
  controllers: [JobController],
  providers: [...queueProviders, JobService],
  exports: [PRIMARY_JOB_QUEUE, SECONDARY_JOB_QUEUE, JobService],
})
export class JobModule {}
