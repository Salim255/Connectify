import { Module } from '@nestjs/common';
import { PresenceGateWay } from './gateways/presence.gateway';
import { AuthModule } from 'src/modules/auth/auth.module';
import { PresenceService } from './services/presence.service';
import { ProfilesModule } from 'src/modules/profiles/profiles.module';

@Module({
  imports: [ProfilesModule, AuthModule],
  providers: [PresenceGateWay, PresenceService],
  exports: [PresenceService],
})
export class SocketModule {}
