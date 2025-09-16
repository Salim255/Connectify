import { DataSource } from 'typeorm';
import { USER_REPOSITORY } from '../../../common/constants/constants';
import { User } from '../../../modules/users/entity/user.entity';

export const userRepository = {
  provide: USER_REPOSITORY,
  useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
  inject: ['DATA_SOURCE'],
};
