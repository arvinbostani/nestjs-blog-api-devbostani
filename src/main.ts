import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('API وبلاگ محمد بستانی')
    .setDescription(
      'یک API وبلاگ ساده که با NestJS، Prisma و PostgreSQL ساخته شده است.',
    )
    .setVersion('1.0')
    .setContact(
      'محمد بستانی',
      'https://your-portfolio-website.com',
      'your-email@example.com',
    )
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'توکن JWT را وارد کنید',
        in: 'header',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Custom options for Swagger UI
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'API وبلاگ محمد بستانی - مستندات', // Change browser tab title
    customCss: `
      .swagger-ui .topbar {
        display: none; /* Hide the topbar */
      }
      .swagger-ui .info,
      .swagger-ui .info h1,
      .swagger-ui .info p,
      .swagger-ui .info .contact,
      .swagger-ui .info .license-url,
      .swagger-ui .info .description,
      .swagger-ui .opblock-summary-description,
      .swagger-ui .opblock-description-wrapper p,
      .swagger-ui .parameter__name,
      .swagger-ui .parameter__type,
      .swagger-ui .parameter__in,
      .swagger-ui .model-title,
      .swagger-ui .model-toggle,
      .swagger-ui .response-col_description {
        direction: rtl;
        text-align: right;
      }
      .swagger-ui .info {
        margin-top: 0; /* Adjust margin if needed after hiding topbar */
      }
    `,
  });

  app.enableShutdownHooks();

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`Swagger UI available at: ${await app.getUrl()}/api`);
}
void bootstrap();
