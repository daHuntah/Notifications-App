import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
  } from '@nestjs/websockets';
  import { OnModuleInit } from '@nestjs/common';
  import { Server } from 'socket.io';
  import { NotificationService } from 'src/notification/notification.service'; 
  import * as admin from 'firebase-admin';

  const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Thay thế ký tự escape
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
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
    
      // Lưu thông báo vào MongoDB
      const notification = await this.notificationService.create({
        title: body.title,
        status: body.status,
        content: body.content,
      });
    
      // Gửi thông báo FCM đến client cùng với dữ liệu từ thông báo `newNotification`
      const registrationToken = 'fwOI1dbMRjudF5SddZOWIu:APA91bEzuHYobpowTv0HHICa76UvOn1UH7O5ajiGHwOZqWe16laexb-5CIFC8LSMeJ0i9EhDCD_hKGftC97y_wgO_rLXJTGUQH8QyECNLaUdLn8zeo4Q8EaWTMffcfYot5ATG_6INbZu'; //tokken cua thiet bi
      const message: admin.messaging.Message = {
        notification: {
          title: body.title,
          body: body.content,
        },
        token: registrationToken,
      };
    
      try {
        await admin.messaging().send(message);
        console.log('FCM notification sent successfully.');
      } catch (error) {
        console.error('Error sending FCM notification:', error);
      }
    
      // Emit sự kiện đến client
      this.server.emit('onNotification', notification);
      console.log('Data processed and event emitted.');
    }
  }