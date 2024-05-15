import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const apiDocConfig = new DocumentBuilder()
    .setTitle('Product Api')
    .setDescription('The product API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, apiDocConfig);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
