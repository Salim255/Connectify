import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { profileRepository } from './repository/profile.repository';
import { ProfilesService } from './services/profiles.service';
import { ProfilesController } from './controllers/profiles.controller';

@Module({
  imports: [DatabaseModule],
  providers: [profileRepository, ProfilesService],
  controllers: [ProfilesController],
})
export class ProfilesModule {}
