import { Inject, Injectable } from '@nestjs/common';
import { MATCH_REPOSITORY } from 'src/common/constants/constants';
import { Repository } from 'typeorm';
import { Match } from '../entity/match.entity';
import { CreateMatchDto } from '../dto/matches-dto';

@Injectable()
export class MatchesService {
  constructor(@Inject(MATCH_REPOSITORY) private matchRepo: Repository<Match>) {}

  async initiateMatch(createMatchPayload: CreateMatchDto): Promise<Match> {
    const match: Match = this.matchRepo.create(createMatchPayload);
    return this.matchRepo.save(match);
  }
}
