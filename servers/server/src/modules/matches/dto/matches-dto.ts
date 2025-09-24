import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Match } from '../entity/match.entity';
import { IsUUID, IsNotEmpty } from 'class-validator';
import { Profile } from 'src/modules/profiles/entity/profile.entity';

export class CreateMatchDto {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsUUID()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsNotEmpty()
  @ApiProperty({
    description: 'User that confirm match',
    example: 'uuid-of-from-user',
  })
  toUserId: string;
}

export class GetMatchesResponseDto {
  @ApiProperty()
  status: string;

  @ApiProperty()
  data: {
    matches: Match[];
  };
}

export class InitiatedMatchResponseDto {
  @ApiProperty()
  status: string;

  @ApiProperty()
  data: {
    match: Match;
  };
}

export class AcceptedMatchResponseDto extends InitiatedMatchResponseDto {}

export class MatchWithPartnerProfile extends OmitType(Match, [
  'fromUserId',
  'toUserId',
]) {
  profile: Profile;
}

export class GetMatchesByUserResponseDto {
  @ApiProperty({ description: 'Response status' })
  status: string;

  @ApiProperty({ description: 'Response data' })
  data: {
    matches: MatchWithPartnerProfile[];
  };
}

export class GetPotentialMatchesByUserResponseDto {
  @ApiProperty({ description: 'Response status' })
  status: string;

  @ApiProperty({ description: 'Response data' })
  data: {
    matches: MatchWithPartnerProfile[];
  };
}
