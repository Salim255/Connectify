import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class PresenceService {
  private onlineUsers = new Map<string, string>();
  private logger = new Logger();

  constructor() {}

  registerUser(userId: string, socketId: string): void {
    // 1: Save the socket
    this.onlineUsers.set(userId, socketId);
  }

  // offline => Online
  updateUserConnectionStatus(): void {
    //
  }
}
