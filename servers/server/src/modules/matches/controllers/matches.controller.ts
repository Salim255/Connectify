import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  AcceptedMatchResponseDto,
  CreateMatchDto,
  GetMatchesByUserResponseDto,
  GetMatchesResponseDto,
  InitiatedMatchResponseDto,
  MatchWithPartnerProfile,
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
  @ApiBearerAuth('access-token')
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
  @ApiBearerAuth('access-token')
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

  @Patch(':matchId/accept')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ description: 'Accept match request' })
  @ApiResponse({
    status: 200,
    type: AcceptedMatchResponseDto,
    description: 'Accepted match response',
  })
  async acceptMatch(
    @Param('matchId') matchId: string,
  ): Promise<AcceptedMatchResponseDto> {
    const match: Match = await this.matchesService.acceptMatch(matchId);
    return {
      status: 'Success',
      data: {
        match,
      },
    };
  }

  @Get('/users')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: `Get user's matches route`,
  })
  @ApiResponse({
    type: GetMatchesByUserResponseDto,
    description: 'Matches by user response',
    status: 200,
  })
  async getMatchesByUser(
    @Req() req: Request & { user: { id: string } },
  ): Promise<GetMatchesByUserResponseDto> {
    const { id: userId } = req.user;
    const matches: MatchWithPartnerProfile[] =
      await this.matchesService.getMatchesByUser(userId);

    return {
      status: 'Success',
      data: {
        matches,
      },
    };
  }
}
