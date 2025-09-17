import { Inject, Injectable } from '@nestjs/common';
import { ChatUser } from '../entity/chat-user.entity';
import { CHAT_USER_REPOSITORY } from 'src/common/constants/constants';
import { Repository } from 'typeorm';

@Injectable()
export class ChatUsersService {
  constructor(
    @Inject(CHAT_USER_REPOSITORY) private chatUserRepo: Repository<ChatUser>,
  ) {}
  async createChatUser(): Promise<ChatUser> {
    const chatUser: ChatUser = this.chatUserRepo.create();
    return await this.chatUserRepo.save(chatUser);
  }
}
