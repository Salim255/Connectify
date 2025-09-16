import { Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProfilesService } from '../services/profiles.service';
import {
  CreatedProfileResponseDto,
  CreateProfileDto,
} from '../dto/profiles.dto';

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
    type: CreatedProfileResponseDto,
  })
  createProfile() {
    return 'hello from create profile';
  }
}
