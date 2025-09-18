import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProfilesService } from '../services/profiles.service';
import {
  CreateProfileDto,
  CreateProfileResponseDto,
  GetProfilesResponseDto,
} from '../dto/profiles.dto';
import { Profile } from '../entity/profile.entity';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt-token.guard';

@ApiTags('Profiles')
@Controller('profiles')
export class ProfilesController {
  constructor(private profilesService: ProfilesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create user profile' })
  @ApiBody({
    type: CreateProfileDto,
    description: `Data to create a user's profile `,
    required: true,
  })
  @ApiResponse({
    status: 201,
    description: 'The profile has been successfully created.',
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

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get non matched profiles by user' })
  @ApiResponse({
    status: 200,
    description: 'Profiles successfully fetched',
    type: GetProfilesResponseDto,
  })
  async getProfiles(): Promise<GetProfilesResponseDto> {
    const profiles: Profile[] = await this.profilesService.getProfiles();

    return {
      status: 'Success',
      data: {
        profiles,
      },
    };
  }
}
