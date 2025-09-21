import { ApiProperty } from '@nestjs/swagger';
import { Chat } from '../entity/chat.entity';
import { IsNotEmpty } from 'class-validator';

export class CreateChatWithMessageDto {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsNotEmpty()
  @ApiProperty({ description: 'Message content' })
  content: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsNotEmpty()
  @ApiProperty({ description: 'Message sender Id' })
  senderProfileId: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsNotEmpty()
  @ApiProperty({ description: 'Message receiver Id' })
  receiverProfileId: string;
}

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

export class GetUserChatsResponseDto extends GetAllChatsResponseDto {}

export class GetSingleChatResponseDto {
  @ApiProperty({ description: 'Get single chat status' })
  status: string;

  @ApiProperty({ description: 'Response data' })
  data: {
    chat: Chat | null;
  };
}
