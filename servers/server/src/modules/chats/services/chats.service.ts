import { Inject, Injectable } from '@nestjs/common';
import { CHAT_REPOSITORY } from 'src/common/constants/constants';
import { Chat } from '../entity/chat.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChatsService {
  constructor(@Inject(CHAT_REPOSITORY) private chatRepo: Repository<Chat>) {}

  async createChat(): Promise<Chat> {
    const chat: Chat = this.chatRepo.create();
    return this.chatRepo.save(chat);
  }
}
