import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { JwtTokenService } from '../services/jwt-token.service';

interface AuthenticatedSocket extends Socket {
  data: {
    userId: string;
    // Add other fields if needed
  };
}

@Injectable()
export class JwtWsAuthGuard implements CanActivate {
  constructor(private jwtTokenService: JwtTokenService) {}
  canActivate(context: ExecutionContext): boolean {
    const client: AuthenticatedSocket = context.switchToWs().getClient();
    const { token } = client.handshake.auth as { token?: string };

    if (!token) return false;
    try {
      const { id: userId } = this.jwtTokenService.verifyToken(token);
      client.data.userId = userId;
      return true;
    } catch (err) {
      return false;
    }
  }
}
