
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Optional CORS (read from env, comma-separated allowed origins)
  const origins = process.env.CORS_ORIGIN?.split(',').map(s => s.trim());
  app.enableCors({ origin: origins ?? true });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // ✅ Bind to Render-assigned port and 0.0.0.0
  const port = Number(process.env.PORT) || 4000;
  await app.listen(port, '0.0.0.0');
  console.log(`Backend listening on ${await app.getUrl()} (PORT=${port})`);
}
bootstrap();
