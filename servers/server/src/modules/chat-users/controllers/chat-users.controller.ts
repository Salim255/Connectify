import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateChatUserDto } from '../dto/chat-users.dto';
import { ChatUser } from '../entity/chat-user.entity';
import { ChatUsersService } from '../services/chat-users.service';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt-token.guard';

@ApiTags('ChatUsers')
@Controller('chat-users')
export class ChatUsersController {
  constructor(private chatUsersService: ChatUsersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
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
