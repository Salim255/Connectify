import { Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Messages')
@Controller('messages')
export class MessagesController {
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
  createMessage(): Promise<Message>{
      return 'Hello from create message'
    }
}
