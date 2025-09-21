import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ namespace: 'profile' })
export class ProfilesGateWay {
  @WebSocketServer()
  server: Server;

  // @SubscribeMessage('register-user')
}
