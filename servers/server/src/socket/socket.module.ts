import { Module } from '@nestjs/common';
import { PresenceGateWay } from './gateways/presence.gateway';
import { AuthModule } from 'src/modules/auth/auth.module';
import { PresenceService } from './services/presence.service';
import { ProfilesModule } from 'src/modules/profiles/profiles.module';
// That forwardRef in NestJS is all about breaking circular dependencies between modules.
import { RoomsModule } from 'src/modules/rooms/rooms.module';
@Module({
  imports: [ProfilesModule, AuthModule, RoomsModule],
  providers: [PresenceGateWay, PresenceService],
})
export class SocketModule {}
