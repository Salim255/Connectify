import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { profileRepository } from './repository/profile.repository';

@Module({
  imports: [DatabaseModule],
  providers: [profileRepository],
})
export class ProfilesModule {}
