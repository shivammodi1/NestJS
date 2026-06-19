import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // remove properties that do not define in the DTO
    forbidNonWhitelisted: true, // throw an error if any non-whitelisted properties are present
  })); // enable validation for incoming requests

  await app.listen(process.env.PORT ?? 3000);
  app.enableShutdownHooks(); // enable shutdown hooks to listen for application shutdown events
}
bootstrap();
