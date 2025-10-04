import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CHAT_REPOSITORY } from 'src/common/constants/constants';
import { Chat } from '../entity/chat.entity';
import { DataSource, Repository } from 'typeorm';
import {
  ChatUser,
  ChatUserRole,
} from 'src/modules/chat-users/entity/chat-user.entity';
import { Message } from 'src/modules/messages/entity/message.entity';
import { CreateChatWithMessageDto } from '../dto/chats-dto';

@Injectable()
export class ChatsService {
  constructor(
    @Inject('DATA_SOURCE') private dataSource: DataSource,
    @Inject(CHAT_REPOSITORY) private chatRepo: Repository<Chat>,
  ) {}

  async createChatWithMessage(payload: CreateChatWithMessageDto) {
    const existChat = await this.findExistingChat(
      payload.senderProfileId,
      payload.receiverProfileId,
    );

    if (existChat) {
      throw new ConflictException(
        `A chat between profiles ${payload.senderProfileId} and ${payload.receiverProfileId} already exists.`,
      );
    }
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
          profileId: payload.senderProfileId,
          roles: [ChatUserRole.ADMIN],
        },
        { chatId: createdChat.id, profileId: payload.receiverProfileId },
      ]);

      // 3. Send first message
      await queryRunner.manager.save(Message, {
        chatId: chat.id,
        senderId: payload.senderProfileId,
        content: payload.content,
      });

      // Commit transaction
      await queryRunner.commitTransaction();

      // Fetch chat with details
      const chatWithDetails = await this.getSingleChat(chat.id);
      if (!chatWithDetails) {
        throw new NotFoundException(
          `Chat with ID ${createdChat.id} was created but could not be retrieved`,
        );
      }
      return chatWithDetails;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async getSingleChat(chatId: string): Promise<Chat | null> {
    return await this.chatRepo
      .createQueryBuilder('chat')
      .leftJoinAndSelect('chat.participants', 'chatUser')
      .leftJoinAndSelect('chatUser.profile', 'profile')
      .leftJoinAndSelect('profile.user', 'user')
      .leftJoinAndSelect('chat.messages', 'message')
      .where('chat.id = :chatId', { chatId })
      .getOne();
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
      .andWhere('user.id != :userId') // this filters participants by userId
      .setParameter('userId', userId)
      .getMany();
  }

  async findExistingChat(
    senderProfileId: string,
    receiverProfileId: string,
  ): Promise<Chat | null> {
    return await this.chatRepo
      .createQueryBuilder('chat')
      .innerJoin('chat.participants', 'chatUser')
      .where('chatUser.profileId IN (:...profileIds)', {
        profileIds: [senderProfileId, receiverProfileId],
      })
      .groupBy('chat.id')
      .having('COUNT(DISTINCT chatUser.profileId) = 2')
      .andWhere('chat.isGroup = false') // optional: only for direct chats
      .getOne();
  }

  async findChatByProfiles(
    senderProfileId: string,
    receiverProfileId: string,
  ): Promise<Chat | null> {
    return await this.chatRepo
      .createQueryBuilder('chat')
      .leftJoinAndSelect('chat.participants', 'chatUser')
      .leftJoinAndSelect('chatUser.profile', 'profile')
      .leftJoinAndSelect('profile.user', 'user')
      .leftJoinAndSelect('chat.messages', 'message')
      .where('chat.isGroup = false')
      .andWhere((qb) => {
        const subQuery = qb
          .subQuery()
          .select('cu.chatId')
          .from('chat_users', 'cu')
          .where('cu.profileId IN (:...profileIds)')
          .groupBy('cu.chatId')
          .having('COUNT(DISTINCT cu.profileId) = 2')
          .getQuery();
        return 'chat.id IN ' + subQuery;
      })
      .setParameter('profileIds', [senderProfileId, receiverProfileId])
      .orderBy('message.createdAt', 'ASC') // optional: sort messages
      .getOne();
  }
}
