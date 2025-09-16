import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { USER_REPOSITORY } from 'src/common/constants/constants';
import { CreatedUserDto, CreateUserDto, SigninUserDto } from '../dto/users.dto';
import { JwtTokenService } from 'src/modules/auth/services/jwt-token.service';
import * as passwordHandler from '../../auth/utils/password-handler';
import { PasswordComparisonPayload } from '../../auth/utils/password-handler';

@Injectable()
export class UserService {
  constructor(
    private jwtTokenService: JwtTokenService,
    @Inject(USER_REPOSITORY) private userRepo: Repository<User>,
  ) {}

  async createUser(
    data: CreateUserDto,
  ): Promise<CreatedUserDto & { token: string }> {
    // Step 1: Check if password match
    if (data.password !== data.passwordConfirm) {
      throw new BadRequestException('The confirmation password does not match');
    }

    // Step 2: Hash password
    const hashedPassword = await passwordHandler.hashedPassword(data.password);

    // Step 3: - Create user
    const user: User = this.userRepo.create({
      ...data,
      password: hashedPassword,
    });

    // Step 4: prepares the entity
    const savedUser: User = await this.userRepo.save(user); // inserts into DB
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = savedUser; // exclude password field

    // Step 5:  - Prepare token
    const token = this.jwtTokenService.createToken(savedUser.id);

    return { ...rest, token };
  }

  async loginUser(
    loginPayload: SigninUserDto,
  ): Promise<CreatedUserDto & { token: string }> {
    const { email } = loginPayload;
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestException('Please provide valid credentials');
    }

    // Step: 2 - Check if password is correct
    const passwords: PasswordComparisonPayload = {
      plainPassword: loginPayload.password,
      hashedPassword: user.password,
    };

    const isPasswordValid = await passwordHandler.correctPassword(passwords);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = user; // exclude password field

    // Prepare token
    const token = this.jwtTokenService.createToken(user.id);

    return { ...rest, token };
  }

  async findAll(): Promise<User[]> {
    return this.userRepo.find();
  }
}
