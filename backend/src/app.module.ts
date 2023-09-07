import { Module, NestModule, MiddlewareConsumer  } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { GatewayModule } from './gateway/gateway.module';
import { JwtMiddleware } from './auth/auth.middleware';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017', {
      dbName: 'notification-app',
    }),
    AuthModule,
    GatewayModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(JwtMiddleware).forRoutes('*'); // Sử dụng JWT Middleware cho tất cả các route
  }
}
