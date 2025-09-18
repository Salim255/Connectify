import { Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateMessageDto } from '../dto/messages-dto';
import { Message } from '../entity/message.entity';

@ApiTags('Messages')
@Controller('messages')
export class MessagesController {
    constructor(){}
  @Post()
  @ApiOperation({
    description: 'Create message router',
  })
  @ApiBody({
    type: CreateMessageDto,
    description: 'Create message payload',
    required: true,
  })
  @ApiResponse({
    type: Message,
    description: 'Created message',
    status: 201,
  })
  async createMessage(body: CreateMessageDto): Promise<Message> {
    const { content, chatId, senderId } = body;
     return 'Hello from create message'
  }
}
