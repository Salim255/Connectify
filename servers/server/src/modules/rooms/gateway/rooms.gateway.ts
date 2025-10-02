import { Logger, UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { JwtWsAuthGuard } from 'src/modules/auth/guard/jwt-token-ws.guard';

@WebSocketGateway()
export class RoomsGateWay {
  private logger = new Logger('Rooms Logger');

  @UseGuards(JwtWsAuthGuard)
  @SubscribeMessage('user:joinRoom')
  handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() roomId: string,
  ) {
    this.logger.log(`Client ${client.id} joined room ${roomId}`);
  }

  @UseGuards(JwtWsAuthGuard)
  @SubscribeMessage('user:leaveRoom')
  handleLeaveRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() roomId: string,
  ) {
    this.logger.log(`Client ${client.id} left room ${roomId}`);
  }
}
