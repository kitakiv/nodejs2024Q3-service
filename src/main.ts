import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { SwaggerModule } from '@nestjs/swagger';
import * as YAML from 'yamljs';
import { join } from 'path';
import { MyLogger } from './logger/logger.service';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(app.get(MyLogger));
  const swaggerDocument = YAML.load(join(__dirname, '../doc/api.yaml'));
  SwaggerModule.setup('api-docs', app, swaggerDocument);
  await app.listen(process.env.PORT);
}
bootstrap();
