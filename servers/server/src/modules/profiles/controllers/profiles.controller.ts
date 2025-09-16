import { Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProfilesService } from '../services/profiles.service';

@ApiTags('Profiles')
@Controller('profiles')
export class ProfilesController {
  constructor(private profilesService: ProfilesService) {}

  @Post()
  @ApiOperation({ summary: 'Create user profile' })
  @ApiBody()
  @ApiResponse()
  async createProfile(){
    
  }
}
