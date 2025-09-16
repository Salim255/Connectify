import { Inject, Injectable } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { USER_REPOSITORY } from 'src/common/constants/constants';

@Injectable()
export class UserService {
  constructor(@Inject(USER_REPOSITORY) private userRepo: Repository<User>) {}

  async createUser(data: Partial<User>): Promise<User> {
    console.log('Saved User:✅✅✅✅', 'savedUser');
    const user = this.userRepo.create(data); // prepares the entity
    const savedUser = await this.userRepo.save(user); // inserts into DB
    console.log('Saved User:✅✅✅✅', savedUser);

    return savedUser; // return the saved entity
  }

  async findAll(): Promise<User[]> {
    return this.userRepo.find();
  }
}
