import { PROFILE_REPOSITORY } from 'src/common/constants/constants';
import { DataSource } from 'typeorm';
import { Profile } from '../entity/profile.entity';

export const profileRepository = {
  provide: PROFILE_REPOSITORY,
  useFactory: (dataSource: DataSource) => dataSource.getRepository(Profile),
  inject: ['DATA_SOURCE'],
};
