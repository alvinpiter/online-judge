import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import * as amqplib from 'amqplib';
import { ConfigKey } from 'src/config';
import { JobController } from './job.controller';
import { JobService } from './job.service';

export const PRIMARY_JOB_QUEUE = 'PRIMARY_JOB_QUEUE';

@Module({
  controllers: [JobController],
  providers: [
    {
      provide: PRIMARY_JOB_QUEUE,
      useFactory: (configService: ConfigService) => {
        const host = configService.get<string>(ConfigKey.RABBITMQ_HOST);
        const username = configService.get<string>(ConfigKey.RABBITMQ_USERNAME);
        const password = configService.get<string>(ConfigKey.RABBITMQ_PASSWORD);

        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [host],
            socketOptions: {
              credentials: amqplib.credentials.plain(username, password),
            },
            queue: PRIMARY_JOB_QUEUE,
            noAck: false,
            queueOptions: { durable: true },
            prefetchCount: 5,
          },
        });
      },
      inject: [ConfigService],
    },
    JobService,
  ],
  exports: [PRIMARY_JOB_QUEUE, JobService],
})
export class JobModule {}
