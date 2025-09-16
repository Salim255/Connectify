import { PROFILE_REPOSITORY } from '../../../common/constants/constants';
import { Profile } from '../entity/profile.entity';
import { Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ProfilesService {
  constructor(
    @Inject(PROFILE_REPOSITORY) private profileRep: Repository<Profile>,
  ) {}
}
