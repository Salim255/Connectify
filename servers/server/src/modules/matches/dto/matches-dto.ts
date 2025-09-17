import { ApiProperty } from '@nestjs/swagger';
import { Match } from '../entity/match.entity';

export class CreateMatchDto {
  @ApiProperty({ description: 'User that initiate match' })
  fromUser: 'uuid';

  @ApiProperty({ description: 'User that confirm match' })
  toUser: 'uuid';
}

export class InitiatedMatchResponseDto {
  @ApiProperty()
  status: string;

  @ApiProperty()
  data: {
    initiatedMatch: Match;
  };
}
