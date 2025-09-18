import { Module } from '@nestjs/common';
import { MatchesController } from './controllers/matches.controller';
import { MatchesService } from './services/matches.service';
import { matchRepository } from './repository/match.repository';
import { DatabaseModule } from '../../database/database.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule, DatabaseModule],
  providers: [MatchesService, matchRepository],
  controllers: [MatchesController],
})
export class MatchesModule {}
