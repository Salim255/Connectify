import { ApiProperty } from '@nestjs/swagger';
import { Chat } from '../entity/chat.entity';

export class CreateChatDto {}

export class CreateChatResponseDto {
  @ApiProperty({ description: 'Creation chat status' })
  status: string;

  @ApiProperty({ description: 'Response data' })
  data: {
    chat: Chat;
  };
}

export class GetAllChatsResponseDto {
  @ApiProperty({ description: 'Get all chats status' })
  status: string;

  @ApiProperty({ description: 'Response data' })
  data: {
    chats: Chat[];
  };
}
