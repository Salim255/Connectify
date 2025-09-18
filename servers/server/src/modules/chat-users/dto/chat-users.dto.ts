import { ApiProperty } from '@nestjs/swagger';

export class CreateChatUserDto {
  @ApiProperty({ description: 'chatId' })
  chatId: string;

  @ApiProperty({ description: 'ProfileId' })
  profileId: string;
}
