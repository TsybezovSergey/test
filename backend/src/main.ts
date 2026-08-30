import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { APP_CONFIG } from './config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // #Ошибка 10
  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());

  // Swagger конфигурация
  // #Ошибка 11
  const config = new DocumentBuilder()
    .setTitle('Food Delivery API')
    .setDescription('API для агрегатора доставки еды')
    .setVersion('1.0')
    .addApiKey({ type: 'apiKey', name: 'x-api-key', in: 'header' }, 'x-api-key')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(APP_CONFIG.port);
  console.log(`Application is running on: http://localhost:${APP_CONFIG.port}`);
  console.log(`Swagger docs: http://localhost:${APP_CONFIG.port}/docs`);
}
bootstrap();
