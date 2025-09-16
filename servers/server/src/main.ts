import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger.config';
import { morganConfig } from './config/morgan.config';
import { HttpExceptionsErrorHandler } from './common/errors/http-exception-errors';
import { processErrorHandler } from './common/errors/process-errors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Initialize Swagger
  setupSwagger(app);

  // Errors handlers
  // Register http exception errors handler
  app.useGlobalFilters(new HttpExceptionsErrorHandler());
  //  Register process errors handler
  processErrorHandler(app);

  morganConfig(app);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
