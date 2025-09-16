import { ApiProperty } from '@nestjs/swagger';

export enum UserGender {
  MALE = 'male',
  FEMALE = 'female',
  NON_BINARY = 'non-binary',
  OTHER = 'other',
}

export class CreateProfileDto {
  @ApiProperty({ description: 'Profile id' })
  userId: string;

  @ApiProperty({ description: 'Profile name' })
  name: string;

  @ApiProperty({ description: 'Profile age' })
  age: Date;

  @ApiProperty({ description: 'Profile gender' })
  gender: UserGender;

  @ApiProperty({ description: 'Profile photo' })
  avatarUrl: string;
}
