import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { userRepository } from './repository/user.repository';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [UserService, userRepository],
  exports: [UserService],
})
export class UserModule {}
