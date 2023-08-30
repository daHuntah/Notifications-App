import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { MessageDto } from 'src/dto/message.dto';

@WebSocketGateway()
export class SocketGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handleMessage(client: Socket, messageDto: MessageDto): void {
    // Gửi thông điệp tới tất cả client đang kết nối
    this.server.emit('message', messageDto.message);
    
  }
}
