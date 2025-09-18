import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateChatUserDto } from '../dto/chat-users.dto';
import { ChatUser } from '../entity/chat-user.entity';
import { ChatUsersService } from '../services/chat-users.service';

@ApiTags('ChatUsers')
@Controller('chat-users')
export class ChatUsersController {
  constructor(private chatUsersService: ChatUsersService) {}
  @Post()
  @ApiOperation({
    summary: 'Create chatUsers router',
  })
  @ApiBody({
    description: 'Create chatUser payload',
    type: CreateChatUserDto,
    required: true,
  })
  @ApiResponse({
    description: 'Create chatUser response',
    type: ChatUser,
    status: 201,
  })
  async createChatUser(@Body() body: CreateChatUserDto): Promise<ChatUser> {
    const { chatId, profileId } = body;
    console.log(chatId, profileId);
    return await this.chatUsersService.createChatUser({ chatId, profileId });
  }
}
