import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateChatDto,
  CreateChatResponseDto,
  CreateChatWithMessageDto,
  GetAllChatsResponseDto,
  GetSingleChatResponseDto,
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
  ): Promise<CreateChatResponseDto> {
    const { content, senderProfileId, receiverProfileId } = body;
    const chat: Chat = await this.chatsService.createChatWithMessage({
      content,
      senderProfileId,
      receiverProfileId,
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

  @Get('/profiles')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Fetch single chat by chat participants ids route',
  })
  @ApiResponse({
    type: GetSingleChatResponseDto,
    status: 2000,
    description: 'Get single chat by Id response',
  })
  async getChatByProfileIds(
    @Query('senderProfileId') senderProfileId: string,
    @Query('receiverProfileId') receiverProfileId: string,
  ): Promise<GetSingleChatResponseDto> {
    const chat: Chat | null = await this.chatsService.findChatByProfiles(
      senderProfileId,
      receiverProfileId,
    );

    return {
      status: 'Success',
      data: { chat: chat },
    };
  }

  @Get('/:chatId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Fetch single chat by chat id route',
  })
  @ApiResponse({
    type: GetSingleChatResponseDto,
    status: 2000,
    description: 'Get single chat by Id response',
  })
  async getChatByChatId(
    @Param('chatId') chatId: string,
  ): Promise<GetSingleChatResponseDto> {
    const chat: Chat | null = await this.chatsService.getSingleChat(chatId);
    if (!chat) {
      throw new NotFoundException(`Chat with ID ${chatId} not found`);
    }
    return {
      status: 'Success',
      data: { chat: chat },
    };
  }
}
