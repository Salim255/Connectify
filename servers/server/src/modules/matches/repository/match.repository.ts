import { DataSource } from 'typeorm';
import { MATCH_REPOSITORY } from '../../../common/constants/constants';
import { Match } from '../entity/match.entity';

export const matchRepository = {
  provide: MATCH_REPOSITORY,
  useFactory: (dataSource: DataSource) => dataSource.getRepository(Match),
  inject: ['DATA_SOURCE'],
};
