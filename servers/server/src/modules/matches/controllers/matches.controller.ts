import { Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateMatchDto } from '../dto/matches-dto';

@ApiTags('Matches')
@Controller('matches')
export class MatchesController {
  @Post()
  @ApiOperation({ description: 'Initiate match route' })
  @ApiBody({
    type: CreateMatchDto,
  })
  @ApiResponse()
  initiateMatch(){
     return 'Hello from match' 
  }
}