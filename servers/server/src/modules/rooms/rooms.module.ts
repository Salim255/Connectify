import { Module } from '@nestjs/common';
import { RoomsGateWay } from './gateway/rooms.gateway';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [RoomsGateWay],
})
export class RoomsModule {}
