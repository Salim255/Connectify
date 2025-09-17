import { ApiProperty } from '@nestjs/swagger';
import { Chat } from '../entity/chat.entity';

export class CreateChatDto {}

export class CreateChatResponseDto {
  @ApiProperty({ description: 'Creation chat status' })
  status: string;
  data: {
    chat: Chat;
  };
}
