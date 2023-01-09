import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { TransformationAndValidationPipe } from './pipes/transformation-and-validation.pipe';
import { ConfigKey } from './config';
import { getRmqOptions } from './modules/job/helpers';

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
  const rabbitMqQueues = configService
    .get<string>(ConfigKey.CONSUMED_QUEUES)
    .split(',');

  rabbitMqQueues.forEach((queue) => {
    app.connectMicroservice({
      transport: Transport.RMQ,
      options: getRmqOptions(
        [rabbitMqHost],
        rabbitMqUsername,
        rabbitMqPassword,
        queue,
      ),
    });
  });

  app.use(cookieParser());
  app.useGlobalPipes(new TransformationAndValidationPipe());

  await app.startAllMicroservices();
  await app.listen(5000);
}

bootstrap();
