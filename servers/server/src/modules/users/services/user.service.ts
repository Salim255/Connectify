import { Inject, Injectable } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { USER_REPOSITORY } from 'src/common/constants/constants';

@Injectable()
export class UserService {
  constructor(@Inject(USER_REPOSITORY) private userRepo: Repository<User>) {}
}
