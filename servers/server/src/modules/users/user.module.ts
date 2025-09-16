import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { userRepository } from './repository/user.repository';
import { DatabaseModule } from 'src/database/database.module';
import { UsersController } from './controllers/users.controller';

@Module({
  imports: [DatabaseModule],
  providers: [UserService, userRepository],
  controllers: [UsersController],
  exports: [UserService],
})
export class UserModule {}
