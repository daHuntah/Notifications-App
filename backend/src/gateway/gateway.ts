import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
  } from '@nestjs/websockets';
  import { OnModuleInit } from '@nestjs/common';
  import { Server } from 'socket.io';
  import { NotificationService } from 'src/notification/notification.service'; 
  
  @WebSocketGateway()
  export class MyGateway implements OnModuleInit {
    constructor(private readonly notificationService: NotificationService) {}
  
    @WebSocketServer()
    server: Server;
  
    async onModuleInit() {
      this.server.on('connection', async (socket) => {
        console.log(socket.id);
        console.log('Connected');
  
        const notifications = await this.notificationService.findAll();
        socket.emit('onNotifications', notifications);
      });
    }
  
    @SubscribeMessage('newNotification')
    async onNewMessage(@MessageBody() body: any) {
      console.log(body);
      const notification = await this.notificationService.create({
        title: body.title,
        status: body.status,
        content: body.content,
      });
      this.server.emit('onNotification', notification);
      console.log('Data processed and event emitted.');
    }
  }