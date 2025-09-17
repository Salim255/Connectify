import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateMatchDto, InitiatedMatchResponseDto } from '../dto/matches-dto';
import { MatchesService } from '../services/matches.service';
import { Match } from '../entity/match.entity';

@ApiTags('Matches')
@Controller('matches')
export class MatchesController {
  constructor(private matchesService: MatchesService) {}
  @Post()
  @ApiOperation({ description: 'Initiate match route' })
  @ApiBody({
    type: CreateMatchDto,
    required: true,
  })
  @ApiResponse({
    status: 201,
    description: 'Match initiation response',
    type: InitiatedMatchResponseDto,
  })
  async initiateMatch(
    @Body() body: CreateMatchDto,
  ): Promise<InitiatedMatchResponseDto> {
    const { toUserId, fromUserId } = body;
    const match: Match = await this.matchesService.initiateMatch({
      toUserId,
      fromUserId,
    });
    return {
      status: 'Success',
      data: { match },
    };
  }
}
