import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ChatsModule } from './modules/chats/chats.module';
import { MatchesModule } from './modules/matches/matches.module';

@Module({
  imports: [MatchesModule, AuthModule, ChatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
