import { Inject, Injectable } from '@nestjs/common';
import { MESSAGE_REPOSITORY } from 'src/common/constants/constants';
import { Repository } from 'typeorm';
import { Message, MessageStatus } from '../entity/message.entity';
import { CreateMessageDto } from '../dto/messages-dto';

@Injectable()
export class MessagesService {
  constructor(
    @Inject(MESSAGE_REPOSITORY) private messageRepo: Repository<Message>,
  ) {}

  async createMessage(data: CreateMessageDto): Promise<Message> {
    const message: Message = this.messageRepo.create(data);
    return this.messageRepo.save(message);
  }

  async updatedMessagesToRead(
    chatId: string,
    userId: string,
  ): Promise<Message[]> {
    const result = await this.messageRepo
      .createQueryBuilder()
      .update(Message)
      .set({ status: MessageStatus.READ })
      .where('chatId = :chatId', { chatId })
      .andWhere('senderId != :senderId', { senderId: userId })
      .andWhere('status != :readStatus', { readStatus: MessageStatus.READ })
      .returning('*')
      .execute();
    return result.raw as Message[];
  }
}
