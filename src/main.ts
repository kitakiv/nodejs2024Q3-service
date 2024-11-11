import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as YAML from 'yamljs';
import { join } from 'path';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerDocument = YAML.load(join(__dirname, '../doc/api.yaml'));
  SwaggerModule.setup('api-docs', app, swaggerDocument);
  await app.listen(process.env.PORT);
}
bootstrap();
