import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateMessageDto } from '../dto/messages-dto';
import { Message } from '../entity/message.entity';
import { MessagesService } from '../services/messages.service';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt-token.guard';

@ApiTags('Messages')
@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}
  @Post()
  @UseGuards(JwtAuthGuard)
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
  async createMessage(@Body() body: CreateMessageDto): Promise<Message> {
    const { content, chatId, senderId } = body;
    return await this.messagesService.createMessage({
      content,
      chatId,
      senderId,
    });
  }
}
