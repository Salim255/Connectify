import { ApiProperty } from '@nestjs/swagger';
import { Profile } from '../entity/profile.entity';
import { IsNotEmpty } from 'class-validator';

export enum UserGender {
  MALE = 'male',
  FEMALE = 'female',
  NON_BINARY = 'non-binary',
  OTHER = 'other',
}

export enum ProfileConnectionStatus {
  ONLINE = 'online',
  OFFLINE = 'offline',
  AWAY = 'away',
  BUSY = 'busy',
  INVISIBLE = 'invisible',
}

export class CreateProfileDto {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsNotEmpty()
  @ApiProperty({ description: 'Profile id' })
  userId?: 'uuid';

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsNotEmpty()
  @ApiProperty({ description: 'Profile name' })
  name: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsNotEmpty()
  @ApiProperty({ description: 'Profile age' })
  age: Date;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsNotEmpty()
  @ApiProperty({ description: 'Profile gender' })
  gender: UserGender;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsNotEmpty()
  @ApiProperty({ description: 'Profile photo' })
  avatarUrl: string;
}

export class CreateProfileResponseDto {
  @ApiProperty({ description: 'Profile create response status' })
  status: string;

  @ApiProperty({ description: 'Response data' })
  data: {
    profile: Profile;
  };
}

export class GetProfilesResponseDto {
  @ApiProperty({ description: 'Profiles that potential match to current user' })
  status: string;

  @ApiProperty({ description: 'Response data' })
  data: {
    profiles: Profile[];
  };
}

export class GetProfileResponseDto extends CreateProfileResponseDto {}
