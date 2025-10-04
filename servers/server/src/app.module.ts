import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ChatsModule } from './modules/chats/chats.module';
import { MatchesModule } from './modules/matches/matches.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/users/user.module';
import { ProfilesModule } from './modules/profiles/profiles.module';
import { ChatUsersModule } from './modules/chat-users/chat-users.module';
import { MessagesModule } from './modules/messages/messages.module';
import { SocketModule } from './socket/socket.module';
import { RoomsModule } from './modules/rooms/rooms.module';

@Module({
  imports: [
    MessagesModule,
    ChatUsersModule,
    ProfilesModule,
    UserModule,
    MatchesModule,
    AuthModule,
    ChatsModule,
    DatabaseModule,
    SocketModule,
    RoomsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
