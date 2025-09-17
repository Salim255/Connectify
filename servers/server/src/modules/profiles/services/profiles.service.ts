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

  async getProfiles(): Promise<Profile[]> {
    return await this.profileRep.find();
  }
}
