import { Inject, Injectable } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { USER_REPOSITORY } from 'src/common/constants/constants';
import { CreatedUserDto } from '../dto/users.dto';
import { JwtTokenService } from 'src/modules/auth/services/jwt-token.service';

@Injectable()
export class UserService {
  constructor(
    private jwtTokenService: JwtTokenService,
    @Inject(USER_REPOSITORY) private userRepo: Repository<User>,
  ) {}

  async createUser(
    data: Partial<User>,
  ): Promise<CreatedUserDto & { token: string }> {
    // Step 1: - Create user
    const user: User = this.userRepo.create(data); // prepares the entity
    const savedUser: User = await this.userRepo.save(user); // inserts into DB

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = savedUser; // exclude password field

    // Step 2:  - Prepare token
    const token = this.jwtTokenService.createToken(savedUser.id);

    return { ...rest, token };
  }

  async findAll(): Promise<User[]> {
    return this.userRepo.find();
  }
}
