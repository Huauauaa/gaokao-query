import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
import { count } from './middlewares/count.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(count);
  await app.listen(3000);
}

bootstrap();
