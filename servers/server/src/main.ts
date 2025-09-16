import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger.config';
import { morganConfig } from './config/morgan.config';
import { HttpExceptionsErrorHandler } from './common/errors/http-exception-errors';
import { processErrorHandler } from './common/errors/process-errors';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Initialize Swagger
  setupSwagger(app);

  // Errors handlers
  // Register http exception errors handler
  const configService = app.get(ConfigService);
  app.useGlobalFilters(new HttpExceptionsErrorHandler(configService));
  //  Register process errors handler
  processErrorHandler(app);

  morganConfig(app);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
