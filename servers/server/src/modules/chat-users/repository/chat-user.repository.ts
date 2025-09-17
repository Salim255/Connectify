import { DataSource } from 'typeorm';
import { ChatUser } from '../entity/chat-user.entity';
import { CHAT_USER_REPOSITORY } from 'src/common/constants/constants';

export const chatUserRepository = {
  provide: CHAT_USER_REPOSITORY,
  useFactory: (dataSource: DataSource) => dataSource.getRepository(ChatUser),
  Inject: ['DATA_SOURCE'],
};
