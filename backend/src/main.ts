import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';
import * as http from 'http';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Create an HTTP server instance
  const server = http.createServer(app.getHttpAdapter().getInstance());

  // Use the IoAdapter to integrate with socket.io
  app.useWebSocketAdapter(new IoAdapter(server));

  await app.listen(3000);
}
bootstrap();
