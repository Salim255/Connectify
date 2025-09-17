import { Inject, Injectable } from '@nestjs/common';
import { MATCH_REPOSITORY } from 'src/common/constants/constants';
import { Repository } from 'typeorm';
import { Match } from '../entity/match.entity';

@Injectable()
export class MatchesService {
  constructor(@Inject(MATCH_REPOSITORY) private matchRepo: Repository<Match>) {}
  async initiateMatch() {}
}
