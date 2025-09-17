import { ApiProperty } from '@nestjs/swagger';
import { Match } from '../entity/match.entity';
import { IsUUID, IsNotEmpty } from 'class-validator';

export class CreateMatchDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description: 'User that initiate match',
    example: 'uuid-of-from-user',
  })
  fromUserId: string;

  @ApiProperty({
    description: 'User that confirm match',
    example: 'uuid-of-from-user',
  })
  toUserId: string;
}

export class InitiatedMatchResponseDto {
  @ApiProperty()
  status: string;

  @ApiProperty()
  data: {
    match: Match;
  };
}
