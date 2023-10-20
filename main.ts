import 'dotenv/config';

import {
  ConsoleLogger,
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

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

  setupSwagger(app);

  const port = process.env.SERVER_PORT ?? 3000;
  await app.listen(port);

  logger.log(`🚀 Server started successfully on port ${port}`);
}

function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Inova Week Management')
    .setDescription(
      'API para gerenciamento de edições, projetos, usuários e avaliações do InovaWeek',
    )
    .setVersion('1.0')
    .addTag('inovaweek')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
}

bootstrap();
