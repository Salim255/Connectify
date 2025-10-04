import { Module } from '@nestjs/common';
import { RoomsGateWay } from './gateway/rooms.gateway';
import { AuthModule } from '../auth/auth.module';
import { MessagesModule } from '../messages/messages.module';
import { SocketModule } from 'src/socket/socket.module';

@Module({
  imports: [SocketModule, MessagesModule, AuthModule],
  providers: [RoomsGateWay],
})
export class RoomsModule {}
