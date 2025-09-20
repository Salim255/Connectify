import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

// This gateway is a core gateway and should be registered at the
//  application level, not just inside a feature module.
@WebSocketGateway({ core: true })
export class PresenceGateWay
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private logger = new Logger('Presence GateWay');

  constructor() {}

  handleConnection(client: any) {
    this.logger.log('Hello from connection');
  }

  handleDisconnect(client: any) {
    this.logger.log('Hello from disconnection');
  }
}
