import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  const globalPrefix = (process.env.API_PREFIX ?? 'api') + '/v1';
  app.setGlobalPrefix(globalPrefix); // All routes will be prefixed with /api/v1

  const config = new DocumentBuilder()
    .setTitle('Connectify API')
    .setDescription('API for modern dating application')
    .setVersion('1.0')
    .addServer('/api/v1') // 👈 Add this line to fix the prefix issue
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Setup Swagger UI at /api
  SwaggerModule.setup('api', app, document);
}
