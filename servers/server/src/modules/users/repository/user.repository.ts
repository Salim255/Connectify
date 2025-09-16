import { USER_REPOSITORY } from 'src/common/constants/constants';
import { User } from 'src/modules/users/entity/user.entity';
import { DataSource } from 'typeorm';

export const UserRepository = {
  provide: USER_REPOSITORY,
  inject: [DataSource],
  useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
};
