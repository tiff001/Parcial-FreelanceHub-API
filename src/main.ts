import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({whitelist: true}));

  const config = new DocumentBuilder()
    .setTitle('Parcial - FreelanceHub - API')
    .setDescription('Plataforma de publicación de servicios freelance')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
  console.log(`FreelanceHub API corriendo en http://localhost:3000`);
  console.log(`Swagger: Swagger: http://localhost:3000/api`);
}
bootstrap();
