import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import * as cookieParser from 'cookie-parser';
import * as amqplib from 'amqplib';
import { AppModule } from './app.module';
import { ConfigKey } from './config';
import { PRIMARY_QUEUE } from './modules/queue/queue.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const rabbitMqHost = configService.get<string>(ConfigKey.RABBITMQ_HOST);
  const rabbitMqUsername = configService.get<string>(
    ConfigKey.RABBITMQ_USERNAME,
  );
  const rabbitMqPassword = configService.get<string>(
    ConfigKey.RABBITMQ_PASSWORD,
  );

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [rabbitMqHost],
      socketOptions: {
        credentials: amqplib.credentials.plain(
          rabbitMqUsername,
          rabbitMqPassword,
        ),
      },
      queue: PRIMARY_QUEUE,
      noAck: false,
      queueOptions: { durable: true },
      prefetchCount: 5,
    },
  });

  app.use(cookieParser());

  await app.startAllMicroservices();
  await app.listen(5000);
}

bootstrap();
