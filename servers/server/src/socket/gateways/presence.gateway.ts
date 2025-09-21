import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtTokenService } from 'src/modules/auth/services/jwt-token.service';
import { PresenceService } from '../services/presence.service';

// This gateway is a core gateway and should be registered at the
//  application level, not just inside a feature module.
@WebSocketGateway({ core: true })
export class PresenceGateWay
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private logger = new Logger('Presence GateWay');

  constructor(
    private presenceService: PresenceService,
    private jwtTokenService: JwtTokenService,
  ) {}

  // Triggered automatically when a client connects
  handleConnection(client: Socket) {
    const { token } = client.handshake.auth;
    try {
      const { id: userId } = this.jwtTokenService.verifyToken(
        (token as string) ?? '',
      );
      this.logger.log('✅ User connected with success...', userId);
      this.presenceService.registerUser(userId, client.id);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      this.logger.log('❌ Invalid token, disconnecting client...');
      client.disconnect();
    }
  }

  // Triggered automatically when a client disconnects
  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  // This method listens for the 'ping' event sent by the client
  @SubscribeMessage('ping')
  handlePing(client: Socket, payload: any) {
    this.logger.log(`Received ping from ${client.id}`, payload); // Log the ping
    // Respond to the client with a 'pong' event and a message + timestamp
    client.emit('pong', {
      message: 'pong received',
      time: new Date(),
    });
  }
}
