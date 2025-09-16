import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { profileRepository } from './repository/profile.repository';
import { ProfilesService } from './services/profiles.service';

@Module({
  imports: [DatabaseModule],
  providers: [profileRepository, ProfilesService],
})
export class ProfilesModule {}
