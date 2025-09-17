import { Module } from '@nestjs/common';
import { MatchesController } from './controllers/matches.controller';
import { MatchesService } from './services/matches.service';
import { matchRepository } from './repository/match.repository';
import { DatabaseModule } from 'src/database/database.module';
@Module({
  imports: [DatabaseModule],
  providers: [MatchesService, matchRepository],
  controllers: [MatchesController],
})
export class MatchesModule {}
