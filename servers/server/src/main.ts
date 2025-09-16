import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger.config';
import { morganConfig } from './config/morgan.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Initialize Swagger
  setupSwagger(app);

  morganConfig(app);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
