import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const configService = app.get(ConfigService);
  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);

  const port = configService.get<number>('API_PORT');

  app.enableCors();
  app.useLogger(logger);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(port);
}
bootstrap();
