import { PROFILE_REPOSITORY } from '../../../common/constants/constants';
import { Profile } from '../entity/profile.entity';
import { Repository } from 'typeorm';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateProfileDto,
  UpdateProfileConnectionStatusDto,
} from '../dto/profiles.dto';

@Injectable()
export class ProfilesService {
  constructor(
    @Inject(PROFILE_REPOSITORY) private profileRep: Repository<Profile>,
  ) {}

  async createProfile(
    createPayload: CreateProfileDto & { userId: string },
  ): Promise<Profile> {
    const profile: Profile = this.profileRep.create(createPayload);
    return await this.profileRep.save(profile);
  }

  async getProfileByUserId(userId: string): Promise<Profile | null> {
    const profile: Profile | null = await this.profileRep.findOneBy({ userId });
    console.log(profile, 'hello profile ✅✅');
    return profile;
  }

  async getPotentialMatchProfiles(userId: string): Promise<Profile[]> {
    const query = `
      SELECT p.*
      FROM profiles p
      WHERE p."userId" != $1
        AND NOT EXISTS (
          SELECT 1
          FROM matches m
          WHERE m."fromUserId" = $1
            AND m."toUserId" = p."userId"
        )
        AND NOT EXISTS (
          SELECT 1
          FROM matches m
          WHERE m."toUserId" = $1
            AND m."fromUserId" = p."userId"
            AND m.status <> 'pending'
        )
    `;
    return await this.profileRep.query(query, [userId]);
  }

  async updateProfileConnectionStatus(
    payload: UpdateProfileConnectionStatusDto,
  ): Promise<Profile | null> {
    const result = await this.profileRep.update(
      { userId: payload.userId }, // condition
      { status: payload.status }, // fields to update
    );

    if (result.affected === 0) {
      throw new NotFoundException(
        `Profile with userId ${payload.userId} not found`,
      );
    }
    // Fetch and return the updated entity
    return this.profileRep.findOneBy({ userId: payload.userId });
  }
}
