import { Module } from '@nestjs/common';
import { PresenceGateWay } from './gateways/presence.gateway';
import { AuthModule } from 'src/modules/auth/auth.module';
import { PresenceService } from './services/presence.service';

// That forwardRef in NestJS is all about breaking circular dependencies between modules.
@Module({
  imports: [AuthModule],
  providers: [PresenceGateWay, PresenceService],
})
export class SocketModule {}
