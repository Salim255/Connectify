import { Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateChatDto, CreateChatResponseDto } from '../dto/chats-dto';

@ApiTags('Chats')
@Controller('chats')
export class ChatsController {
  @Post()
  @ApiOperation({ summary: 'Create chat router' })
  @ApiBody({
    type: CreateChatDto,
    required: true,
    description: 'Create chat payload',
  })
  @ApiResponse({
    status: 201,
    type: CreateChatResponseDto,
    description: 'Create chat response',
  })
  createChat() {
    return 'Hello from create chat';
  }
}
