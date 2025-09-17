import { Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Chats')
@Controller('chats')
export class ChatsController {
  @Post()
  @ApiOperation()
  @ApiBody()
  @ApiResponse()
  createChat() {
    return 'Hello from create chat';
}
}
