import { Inject, Injectable } from '@nestjs/common';
import { ChatUser } from '../entity/chat-user.entity';
import { CHAT_USER_REPOSITORY } from 'src/common/constants/constants';
import { Repository } from 'typeorm';
import { CreateChatUserDto } from '../dto/chat-users.dto';

@Injectable()
export class ChatUsersService {
  constructor(
    @Inject(CHAT_USER_REPOSITORY) private chatUserRepo: Repository<ChatUser>,
  ) {}
  async createChatUser(data: CreateChatUserDto): Promise<ChatUser> {
    const chatUser: ChatUser = this.chatUserRepo.create(data);
    return await this.chatUserRepo.save(chatUser);
  }
}
