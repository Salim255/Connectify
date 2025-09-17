import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { ChatUsersController } from './controllers/chat-users.controller';

@Module({
  imports: [DatabaseModule],
  providers: [],
  controllers: [ChatUsersController],
})
export class ChatUsersModule {}
