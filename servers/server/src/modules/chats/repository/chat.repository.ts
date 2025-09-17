import { CHAT_REPOSITORY } from '../../../common/constants/constants';
import { DataSource } from 'typeorm';

export const chatRepository = {
  provide: CHAT_REPOSITORY,
  useFactory: (dataSource: DataSource) => dataSource.getRepository(Chat),
  inject: ['DATA_SOURCE'],
};
