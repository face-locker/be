import { Logger, RequestMethod, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { json, urlencoded } from 'express';
import { AppModule } from './app.module';
import { ApiConfigService } from './shared/services/api-config.service';
import { SharedModule } from './shared/shared.module';
import { configLogging } from './shared/configuration/config-logging';
import { configureSwagger } from './shared/configuration/config-swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.select(SharedModule).get(ApiConfigService);

  app.setGlobalPrefix('/api/v1', {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  });

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      stopAtFirstError: false,
    }),
  );

  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ extended: true, limit: '10mb' }));

  configureSwagger(app, configService);
  configLogging(app, configService);

  await app.startAllMicroservices();
  await app.listen(configService.serverPort);

  Logger.log(`server running on ${await app.getUrl()}`);

  return app;
}

void bootstrap();
