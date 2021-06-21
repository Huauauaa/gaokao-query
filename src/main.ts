import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as chalk from 'chalk';
import * as internalIp from 'internal-ip';
const ipv4 = internalIp.v4.sync();
import { count } from './middlewares/count.middleware';
import { HttpExceptionFilter } from './filters/http-exception.filter';

const port = process.env.SERVER_PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(count);
  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('The API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port, '0.0.0.0', () => {
    console.log(`
    App running at:
    - Local:   ${chalk.green(`http://localhost:${port}/api/`)}
    - Network: ${chalk.green(`http://${ipv4}:${port}/api/`)}
    `);
  });
}

bootstrap();
