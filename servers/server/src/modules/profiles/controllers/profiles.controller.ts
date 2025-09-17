import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProfilesService } from '../services/profiles.service';
import {
  CreateProfileDto,
  CreateProfileResponseDto,
} from '../dto/profiles.dto';
import { Profile } from '../entity/profile.entity';

@ApiTags('Profiles')
@Controller('profiles')
export class ProfilesController {
  constructor(private profilesService: ProfilesService) {}

  @Post()
  @ApiOperation({ summary: 'Create user profile' })
  @ApiBody({
    type: CreateProfileDto,
    description: `Data to create a user's profile `,
    required: true,
  })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: CreateProfileResponseDto,
  })
  async createProfile(
    @Body() body: CreateProfileDto,
  ): Promise<CreateProfileResponseDto> {
    const { userId, name, age, gender, avatarUrl } = body;
    const profile: Profile = await this.profilesService.createProfile({
      userId,
      name,
      age,
      gender,
      avatarUrl,
    });

    return {
      status: 'Success',
      data: {
        profile,
      },
    };
  }
}
