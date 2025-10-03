import { Logger, UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtWsAuthGuard } from 'src/modules/auth/guard/jwt-token-ws.guard';

@WebSocketGateway()
export class RoomsGateWay {
  @WebSocketServer()
  private server: Server;

  private logger = new Logger('Rooms Logger');

  @UseGuards(JwtWsAuthGuard)
  @SubscribeMessage('user:joinRoom')
  async handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() roomId: string,
  ) {
    this.logger.log(`Client ${client.id} joined room ${roomId}`);

    // 1 Join room with chatId
    await client.join(roomId);

    // 2 Check users numbers
    const length = (await this.server.in(roomId).fetchSockets()).length;
    if (length === 2) {
      // 1 Updated all messages sent to this userId to read
      // 2 Sent notification to partner to so it can fetch updated messages
    }
  }

  @UseGuards(JwtWsAuthGuard)
  @SubscribeMessage('user:leaveRoom')
  async handleLeaveRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() roomId: string,
  ) {
    this.logger.log(`Client ${client.id} left room ${roomId}`);
    await client.leave(roomId);
  }

  @UseGuards(JwtWsAuthGuard)
  @SubscribeMessage('user:typing')
  handleTyping(
    @ConnectedSocket() client: Socket,
    @MessageBody() roomId: string,
  ) {
    this.logger.log(`Client ${client.id} typing to room ${roomId}`);
  }

  @UseGuards(JwtWsAuthGuard)
  @SubscribeMessage('user:stop-typing')
  handleStopTyping(
    @ConnectedSocket() client: Socket,
    @MessageBody() roomId: string,
  ) {
    this.logger.log(`Client ${client.id} stop typing 🛑 to room ${roomId}`);
  }

  @UseGuards(JwtWsAuthGuard)
  @SubscribeMessage('user:send-message')
  async handleSendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() roomId: string,
  ) {
    const res = await this.server.fetchSockets();
    this.logger.log(
      `Client ${client.id} send message ✅ to room ${roomId}`,
      res,
    );
  }
}
