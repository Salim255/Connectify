import { Module } from '@nestjs/common';
import { PresenceGateWay } from './gateways/presence.gateway';

// That forwardRef in NestJS is all about breaking circular dependencies between modules.
@Module({
  providers: [PresenceGateWay],
})
export class SocketModule {}
