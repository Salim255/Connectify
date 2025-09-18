import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateMatchDto,
  GetMatchesResponseDto,
  InitiatedMatchResponseDto,
} from '../dto/matches-dto';
import { MatchesService } from '../services/matches.service';
import { Match } from '../entity/match.entity';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt-token.guard';

@ApiTags('Matches')
@Controller('matches')
export class MatchesController {
  constructor(private matchesService: MatchesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
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

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all matches route' })
  @ApiResponse({
    status: 200,
    type: GetMatchesResponseDto,
    description: 'All matches getter response',
  })
  async getAllMatches(): Promise<GetMatchesResponseDto> {
    const matches: Match[] = await this.matchesService.getAllMatches();
    return {
      status: 'Success',
      data: {
        matches,
      },
    };
  }
}
