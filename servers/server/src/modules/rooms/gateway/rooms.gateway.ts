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
import { MessagesService } from 'src/modules/messages/services/messages.service';
import { PresenceService } from 'src/socket/services/presence.service';

export type SendMessagePayload = {
  roomId: string;
  partnerId: string;
};

@WebSocketGateway()
export class RoomsGateWay {
  @WebSocketServer()
  private server: Server;

  private logger = new Logger('Rooms Logger');

  constructor(
    private presenceService: PresenceService,
    private messagesService: MessagesService,
  ) {}

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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const userId = client.data.userId as string;
      if (!roomId || !userId) return;
      const messages = await this.messagesService.updatedMessagesToRead(
        roomId,
        userId,
      );
      this.logger.log(messages, 'Hello ✅✅');
      // 2 Sent notification to partner to so it can fetch updated messages
      client.to(roomId).emit('receiver:read-messages', roomId);
      if (messages.length) {
        // Send notification to partner socket
        client.to(roomId).emit('receiver:read-messages', roomId);
      }
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
    @MessageBody() payLoad: SendMessagePayload,
  ) {
    const result = await this.server.in(payLoad.roomId).fetchSockets();

    this.logger.log(
      `Client ${client.id} send message ✅ to room ${payLoad.roomId}`,
      result.length,
    );

    // Check if there are 2 users, then update message ti read
    const partnerSocket = this.presenceService.getSocketByUserId(
      payLoad.partnerId,
    );

    console.log(partnerSocket);
  }
}
