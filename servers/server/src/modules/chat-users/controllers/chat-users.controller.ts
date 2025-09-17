import { Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateChatUserDto } from '../dto/chat-users.dto';
import { ChatUser } from '../entity/chatUser.entity';

@ApiTags('ChatUsers')
@Controller('chatUsers')
export class ChatUsersController {
  constructor() {}
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
    description: '',
    type: ChatUser,
    status: 201,
  })
  createChatUser() {
    return 'hello from chatUser creation';
  }
}
