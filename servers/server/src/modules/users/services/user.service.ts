import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; // ✅ correct import
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}
}
