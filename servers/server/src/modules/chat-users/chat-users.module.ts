import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { ChatUsersController } from './controllers/chat-users.controller';
import { ChatUsersService } from './services/chat-users.service';
import { chatUserRepository } from './repository/chat-user.repository';

@Module({
  imports: [DatabaseModule],
  providers: [chatUserRepository, ChatUsersService],
  controllers: [ChatUsersController],
})
export class ChatUsersModule {}
