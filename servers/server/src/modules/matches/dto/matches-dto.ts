import { ApiProperty } from '@nestjs/swagger';
import { Match } from '../entity/match.entity';
import { IsUUID, IsNotEmpty } from 'class-validator';

export class CreateMatchDto {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsUUID()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsNotEmpty()
  @ApiProperty({
    description: 'User that initiate match',
    example: 'uuid-of-from-user',
  })
  fromUserId: string;

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
