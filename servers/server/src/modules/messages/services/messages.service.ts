import { Inject, Injectable } from '@nestjs/common';
import { MESSAGE_REPOSITORY } from 'src/common/constants/constants';
import { Repository } from 'typeorm';
import { Message } from '../entity/message.entity';
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
}
