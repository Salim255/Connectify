import { DataSource } from 'typeorm';
import { MESSAGE_REPOSITORY } from '../../../common/constants/constants';
import { Message } from '../entity/message.entity';

export const messageRepository = {
  provide: MESSAGE_REPOSITORY,
  useFactory: (dataSource: DataSource) => dataSource.getRepository(Message),
  inject: ['DATA_SOURCE'],
};
