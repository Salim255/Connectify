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

  async getAllChats(): Promise<Chat[]> {
    return await this.chatRepo.find();
  }

  async getUserChats(userId: string) {
    return await this.chatRepo
      .createQueryBuilder('chat')
      .leftJoinAndSelect('chat.participants', 'chatUser')
      .leftJoinAndSelect('chat.messages', 'message')
      .leftJoinAndSelect('chatUser.profile', 'profile')
      .where('profile.userId = :userId', { userId })
      .getMany();
  }
}
