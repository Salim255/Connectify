import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { MATCH_REPOSITORY } from 'src/common/constants/constants';
import { Repository } from 'typeorm';
import { Match, MatchStatus } from '../entity/match.entity';
import {
  CreateMatchDto,
  MatchWithPartnerProfile,
  PotentialMatch,
} from '../dto/matches-dto';

@Injectable()
export class MatchesService {
  constructor(@Inject(MATCH_REPOSITORY) private matchRepo: Repository<Match>) {}

  async initiateMatch(
    createMatchPayload: CreateMatchDto & { fromUserId: string },
  ): Promise<Match> {
    const match: Match = this.matchRepo.create(createMatchPayload);
    return this.matchRepo.save(match);
  }

  async getAllMatches(): Promise<Match[]> {
    return await this.matchRepo.find();
  }

  async acceptMatch(matchId: string): Promise<Match> {
    await this.matchRepo.update(matchId, {
      status: MatchStatus.MATCHED,
      matchedAt: new Date(),
      updatedAt: new Date(),
    });

    const updatedMatch = await this.matchRepo.findOneBy({ id: matchId });
    if (!updatedMatch) {
      throw new NotFoundException(`Match with ID ${matchId} not found`);
    }
    return this.matchRepo.save(updatedMatch);
  }

  async getMatchesByUser(userId: string): Promise<MatchWithPartnerProfile[]> {
    const query = `
      SELECT
        m.id,
        m.status,
        m."isFavorite",
        m."isHidden",
        m."createdAt",
        m."updatedAt",
        m."matchedAt",
        row_to_json(p) AS profile
      FROM matches m
      JOIN profiles p
        ON p."userId" = CASE
          WHEN m."fromUserId" = $1 THEN m."toUserId"
          ELSE m."fromUserId"
        END
      WHERE m.status = 'matched'
        AND ($1 IN (m."fromUserId", m."toUserId"))
      ORDER BY m."updatedAt" DESC
    `;

    const matches: MatchWithPartnerProfile[] = await this.matchRepo.query(
      query,
      [userId],
    );

    return matches;
  }

  async getPotentialMatchesByUser(userId: string): Promise<PotentialMatch[]> {
    const query = `
    SELECT 
      NULL::uuid          AS id,
      row_to_json(p.*)    AS profile,
      NULL::timestamp     AS "matchedAt",
      NULL::text          AS status,
      NULL::boolean       AS "isFavorite",
      NULL::boolean       AS "isHidden",
      NULL::timestamp     AS "createdAt",
      NULL::timestamp     AS "updatedAt"
    FROM profiles p
    WHERE p."userId" != $1
      AND NOT EXISTS (
        -- Rule 3: exclude if current user already sent a request
        SELECT 1
        FROM matches m
        WHERE m."fromUserId" = $1
          AND m."toUserId" = p."userId"
      )
      AND NOT EXISTS (
        -- Rule 2: exclude if they sent me a request that is not pending
        SELECT 1
        FROM matches m
        WHERE m."toUserId" = $1
          AND m."fromUserId" = p."userId"
          AND m.status <> 'pending'
      );
    `;
    const potentialMatches: PotentialMatch[] = await this.matchRepo.query(
      query,
      [userId],
    );
    return potentialMatches;
  }
}
