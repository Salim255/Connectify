import { Inject, Injectable } from '@nestjs/common';
import { CHAT_REPOSITORY } from 'src/common/constants/constants';
import { Chat } from '../entity/chat.entity';
import { DataSource, Repository } from 'typeorm';
import {
  ChatUser,
  ChatUserRole,
} from 'src/modules/chat-users/entity/chat-user.entity';
import { Message } from 'src/modules/messages/entity/message.entity';

@Injectable()
export class ChatsService {
  constructor(
    private dataSource: DataSource,
    @Inject(CHAT_REPOSITORY) private chatRepo: Repository<Chat>,
  ) {}

  async createChatWithMessage(
    currentUserId: string,
    recipientId: string,
    messageText: string,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 1. Create chat
      const chat = this.chatRepo.create();
      const createdChat: Chat = await queryRunner.manager.save(chat);

      // 2. Add participants
      await queryRunner.manager.save(ChatUser, [
        {
          chatId: createdChat.id,
          profileId: currentUserId,
          roles: [ChatUserRole.ADMIN],
        },
        { chatId: createdChat.id, profileId: recipientId },
      ]);

      // 3. Send first message
      await queryRunner.manager.save(Message, {
        chatId: chat.id,
        senderId: currentUserId,
        content: messageText,
        sentAt: new Date(),
      });

      await queryRunner.commitTransaction();
      return chat;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

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
