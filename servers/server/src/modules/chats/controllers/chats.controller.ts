import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateChatDto,
  CreateChatResponseDto,
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
  async getUserChats(): Promise<GetUserChatsResponseDto> {
    const chats: Chat[] = await this.chatsService.getUserChats();
    return {
      status: 'Success',
      data: { chats },
    };
  }
}
