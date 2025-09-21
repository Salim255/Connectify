import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class PresenceService {
  private onlineUsers = new Map<string, string>();
  private logger = new Logger();

  constructor() {}

  registerUser(userId: string, socketId: string): void {
    // Save the socket
    this.onlineUsers.set(userId, socketId);
  }

  unregisterUser(userId?: string, socketId?: string) {
    if (userId) {
      this.onlineUsers.delete(userId);
    } else if (socketId) {
      // find the userId by socketId
      for (const [uid, sid] of this.onlineUsers.entries()) {
        if (sid === socketId) {
          this.onlineUsers.delete(uid);
          break;
        }
      }
    }
  }
}
