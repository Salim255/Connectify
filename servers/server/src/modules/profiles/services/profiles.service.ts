import { PROFILE_REPOSITORY } from '../../../common/constants/constants';
import { Profile } from '../entity/profile.entity';
import { Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { CreateProfileDto } from '../dto/profiles.dto';

@Injectable()
export class ProfilesService {
  constructor(
    @Inject(PROFILE_REPOSITORY) private profileRep: Repository<Profile>,
  ) {}

  async createProfile(createPayload: CreateProfileDto): Promise<Profile> {
    const profile: Profile = this.profileRep.create(createPayload);
    return await this.profileRep.save(profile);
  }

  async getPotentialMatchProfiles(userId: string): Promise<Profile[]> {
    // const query = `SELECT * FROM profiles`;
    const query = `
      SELECT p.*
      FROM profiles p
      WHERE p."userId" != $1
        AND p."userId" NOT IN (
          SELECT 
            CASE 
              WHEN m."fromUserId" = $1 THEN m."toUserId"
              WHEN m."toUserId" = $1 THEN m."fromUserId"
            END
          FROM matches m
          WHERE m.status = 'matched'
            AND ($1 IN (m."fromUserId", m."toUserId"))
        )
    `;
    return await this.profileRep.query(query, [userId]);
  }
}
