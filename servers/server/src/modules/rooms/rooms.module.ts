import { Module } from '@nestjs/common';
import { RoomsGateWay } from './gateway/rooms.gateway';
import { AuthModule } from '../auth/auth.module';
import { MessagesModule } from '../messages/messages.module';
@Module({
  imports: [MessagesModule, AuthModule],
  providers: [RoomsGateWay],
})
export class RoomsModule {}
