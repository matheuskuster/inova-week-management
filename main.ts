import 'dotenv/config';

import { ConsoleLogger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './src/infra/app.module';

async function bootstrap() {
  const logger = new ConsoleLogger();

  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.useGlobalPipes(new ValidationPipe());

  const port = process.env.SERVER_PORT ?? 3000;
  await app.listen(port);

  logger.log(`🚀 Server started successfully on port ${port}`);
}

bootstrap();
