import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtTokenService } from '../services/jwt-token.service';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtTokenService: JwtTokenService) {}
  canActivate(context: ExecutionContext): boolean {
    const request = context
      .switchToHttp()
      .getRequest<Request & { user?: { id: string } }>();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return false;
    }
    const token = authHeader.split(' ')[1];
    try {
      console.log(token, 'Hello from');
      const decoded = this.jwtTokenService.verifyToken(token);
      // 4 Set decode as user in request
      request.user = { id: decoded.id };
      return true;
    } catch {
      return false;
    }
  }
}
