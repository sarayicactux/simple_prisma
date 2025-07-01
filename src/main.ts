import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const env = 'test'.toLowerCase();
  const config = new DocumentBuilder()
    .setTitle('test')
    .setDescription('prisma')
    .setVersion('1.0.0')
    .addTag('nothing')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  if (env === 'test') {
    SwaggerModule.setup('api', app, document);
  }
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
