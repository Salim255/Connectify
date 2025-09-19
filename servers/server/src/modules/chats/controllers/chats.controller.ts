import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateChatDto,
  CreateChatResponseDto,
  CreateChatWithMessageDto,
  GetAllChatsResponseDto,
  GetUserChatsResponseDto,
} from '../dto/chats-dto';
import { ChatsService } from '../services/chats.service';
import { Chat } from '../entity/chat.entity';
import { JwtAuthGuard } from '../../auth/guard/jwt-token.guard';

@ApiTags('Chats')
@Controller('chats')
export class ChatsController {
  constructor(private chatsService: ChatsService) {}

  @Post('/chat-with-message')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create chat with message router' })
  @ApiBody({
    type: CreateChatWithMessageDto,
    required: true,
    description: 'Create with chat message  payload',
  })
  @ApiResponse({
    status: 201,
    type: CreateChatResponseDto,
    description: 'Create chat response',
  })
  async createChatWithMessage(
    @Body() body: CreateChatWithMessageDto,
    @Req() req: Request & { user: { id: string } },
  ): Promise<CreateChatResponseDto> {
    const { id: userId } = req.user;
    const { content, senderProfileId, receiverProfileId } = body;
    const chat: Chat = await this.chatsService.createChatWithMessage({
      content,
      senderProfileId,
      receiverProfileId,
      userId,
    });
    return {
      status: 'Success',
      data: {
        chat,
      },
    };
  }

  @Post()
  @UseGuards(JwtAuthGuard)
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
  async createChat(): Promise<CreateChatResponseDto> {
    const chat: Chat = await this.chatsService.createChat();
    return {
      status: 'Success',
      data: {
        chat,
      },
    };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Fetch all chats route',
  })
  @ApiResponse({
    type: GetAllChatsResponseDto,
    status: 2000,
    description: 'Get all chats response',
  })
  async getAllChats(): Promise<GetAllChatsResponseDto> {
    const chats: Chat[] = await this.chatsService.getAllChats();
    return {
      status: 'Success',
      data: { chats },
    };
  }

  @Get('/users')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Fetch all chats route',
  })
  @ApiResponse({
    type: GetUserChatsResponseDto,
    status: 2000,
    description: 'Get all chats response',
  })
  async getUserChats(
    @Req() req: Request & { user: { id: string } },
  ): Promise<GetUserChatsResponseDto> {
    const { id } = req.user;
    const chats: Chat[] = await this.chatsService.getUserChats(id);
    return {
      status: 'Success',
      data: { chats },
    };
  }
}
