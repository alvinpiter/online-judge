import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { TransformationAndValidationPipe } from './pipes/transformation-and-validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.useGlobalPipes(new TransformationAndValidationPipe());

  await app.listen(5000);
}
bootstrap();
