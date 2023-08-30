import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { SocketGateway } from './socket/socket.gateway';



@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017',{
      dbName: 'notification-app',
    }) ,
    AuthModule,
    
  ],
  providers: [SocketGateway],
 
  
})
export class AppModule {}




