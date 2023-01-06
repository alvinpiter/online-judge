import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import * as amqplib from 'amqplib';
import { ConfigKey } from 'src/config';

export const PRIMARY_QUEUE = 'PRIMARY_QUEUE';

@Module({
  providers: [
    {
      provide: PRIMARY_QUEUE,
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
            queue: PRIMARY_QUEUE,
            noAck: false,
            queueOptions: { durable: true },
            prefetchCount: 5,
          },
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [PRIMARY_QUEUE],
})
export class QueueModule {}
