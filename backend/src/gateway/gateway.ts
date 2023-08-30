import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { OnModuleInit } from '@nestjs/common';
import { Server } from "socket.io"

@WebSocketGateway()
export class MyGateway  {

  
    @SubscribeMessage('newMessage')
    onNewMessage(@MessageBody() body: any) {
        console.log(body);
    }
}
