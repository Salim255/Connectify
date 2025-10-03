import { Injectable, Logger } from '@nestjs/common';
import {
  ProfileConnectionStatus,
  UpdateProfileConnectionStatusDto,
} from 'src/modules/profiles/dto/profiles.dto';
import { ProfilesService } from 'src/modules/profiles/services/profiles.service';
@Injectable()
export class PresenceService {
  private onlineUsers = new Map<string, string>();
  private logger = new Logger();

  constructor(private profilesService: ProfilesService) {}

  async registerUser(userId: string, socketId: string): Promise<void> {
    // Save the socket
    this.onlineUsers.set(userId, socketId);
    await this.updateProfileStatus(userId, ProfileConnectionStatus.ONLINE);
  }

  async unregisterUser(socketId: string, userId?: string) {
    if (userId) {
      this.onlineUsers.delete(userId);
      await this.updateProfileStatus(userId, ProfileConnectionStatus.OFFLINE);
    } else if (socketId) {
      // find the userId by socketId
      for (const [uid, sid] of this.onlineUsers.entries()) {
        if (sid === socketId) {
          this.onlineUsers.delete(uid);
          await this.updateProfileStatus(uid, ProfileConnectionStatus.OFFLINE);
          break;
        }
      }
    }
  }

  async updateProfileStatus(userId: string, status: ProfileConnectionStatus) {
    const payLoad: UpdateProfileConnectionStatusDto = {
      userId,
      status,
    };
/*     const profile =
      await this.profilesService.updateProfileConnectionStatus(payLoad);
    this.logger.log(profile); */
  }
}
