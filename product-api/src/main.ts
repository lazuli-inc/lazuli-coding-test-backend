import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ProductModule } from './product/product.module';

async function bootstrap() {
  const app = await NestFactory.create(ProductModule);

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
