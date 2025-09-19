import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProfilesService } from '../services/profiles.service';
import {
  CreateProfileDto,
  CreateProfileResponseDto,
  GetProfileResponseDto,
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
  @Get('/users')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get profile by user route' })
  @ApiResponse({
    status: 200,
    description: 'Potential match Profiles successfully fetched',
    type: GetProfileResponseDto,
  })
  async getUserProfile(
    @Req() req: Request & { user: { id: string } },
  ): Promise<GetProfileResponseDto> {
    const { id: userId } = req.user;
    const profile: Profile | null =
      await this.profilesService.getProfileByUserId(userId);

    if (!profile) {
      throw new NotFoundException(
        `Profile for user ID ${userId} was not found or could not be retrieved.`,
      );
    }
    return {
      status: 'Success',
      data: {
        profile,
      },
    };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get potential matched profiles by user' })
  @ApiResponse({
    status: 200,
    description: 'Potential match Profiles successfully fetched',
    type: GetProfilesResponseDto,
  })
  async getProfiles(
    @Req() req: Request & { user: { id: string } },
  ): Promise<GetProfilesResponseDto> {
    const { id: userId } = req.user;
    const profiles: Profile[] =
      await this.profilesService.getPotentialMatchProfiles(userId);

    return {
      status: 'Success',
      data: {
        profiles,
      },
    };
  }
}
