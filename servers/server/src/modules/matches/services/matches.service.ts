import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { MATCH_REPOSITORY } from 'src/common/constants/constants';
import { Repository } from 'typeorm';
import { Match, MatchStatus } from '../entity/match.entity';
import { CreateMatchDto } from '../dto/matches-dto';

@Injectable()
export class MatchesService {
  constructor(@Inject(MATCH_REPOSITORY) private matchRepo: Repository<Match>) {}

  async initiateMatch(createMatchPayload: CreateMatchDto): Promise<Match> {
    const match: Match = this.matchRepo.create(createMatchPayload);
    return this.matchRepo.save(match);
  }

  async getAllMatches(): Promise<Match[]> {
    return await this.matchRepo.find();
  }

  async acceptMatch(matchId: string): Promise<Match> {
    await this.matchRepo.update(matchId, { status: MatchStatus.MATCHED });

    const updatedMatch = await this.matchRepo.findOneBy({ id: matchId });
    if (!updatedMatch) {
      throw new NotFoundException(`Match with ID ${matchId} not found`);
    }
    return this.matchRepo.save(updatedMatch);
  }
}
