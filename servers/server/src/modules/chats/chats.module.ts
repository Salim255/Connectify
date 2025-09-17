import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { chatRepository } from './repository/chat.repository';
import { ChatsService } from './services/chats.service';

@Module({
  imports: [DatabaseModule],
  providers: [ChatsService, chatRepository],
})
export class ChatsModule {}
