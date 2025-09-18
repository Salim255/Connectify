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

  async getUserChats(userId: string): Promise<Chat[]> {
    return await this.chatRepo
      .createQueryBuilder('chat')
      .leftJoinAndSelect('chat.participants', 'chatUser')
      .leftJoinAndSelect('chatUser.profile', 'profile')
      .leftJoinAndSelect('profile.user', 'user')
      .leftJoinAndSelect('chat.messages', 'message')
      .where((qb) => {
        const subQuery = qb
          .subQuery()
          .select('chatUserSub.chatId')
          .from('chat_users', 'chatUserSub')
          .where(
            'chatUserSub.profileId IN ' +
              qb
                .subQuery()
                .select('profileSub.id')
                .from('profiles', 'profileSub')
                .where('profileSub.userId = :userId')
                .getQuery(),
          )
          .getQuery();
        return 'chat.id IN ' + subQuery;
      })
      .setParameter('userId', userId)
      .getMany();
  }
}
