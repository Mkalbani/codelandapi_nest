import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist: true,
      forbidNonWhitelisted: true, 
      transform: true,
    }
  ));
const config = new DocumentBuilder()
.setTitle('Blog API')
.setDescription('Blog API')
.setTermsOfService('http://localhost:3000/terms-of-service')
.setLicense('MIT', 'http://www.opensource.org/licenses')
.setContact('Dev Othman', 'http://localhost:3000/contact', 'email@example.com')
.setVersion('1.0')
.build();
  const document = SwaggerModule.createDocument(app, config); 
  SwaggerModule.setup('doc',app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
