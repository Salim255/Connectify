import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { MessagesService } from './services/messages.service';
import { messageRepository } from './repository/message.repository';
import { MessagesController } from './controllers/messages.controller';

@Module({
  imports: [DatabaseModule],
  providers: [MessagesService, messageRepository],
  controllers: [MessagesController],
})
export class MessagesModule {}
