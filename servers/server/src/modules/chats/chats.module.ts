import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { chatRepository } from './repository/chat.repository';
import { ChatsService } from './services/chats.service';
import { ChatsController } from './controllers/chats.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule, DatabaseModule],
  providers: [ChatsService, chatRepository],
  controllers: [ChatsController],
})
export class ChatsModule {}
