import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  SUPPORT = 'support',
}

export const userObjectExample = {
  _id: '123IZN',
  name: 'Salim',
  email: 'test@gmail.com',
  isEmailVerified: false,
  isActive: true,
  role: 'user',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export class CreateUserDto {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsNotEmpty()
  @ApiProperty({ description: `User's email`, example: 'test@gmail.com' })
  email: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsNotEmpty()
  @ApiProperty({ description: `User's password` })
  password: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsNotEmpty()
  @ApiProperty({ description: `User's confirm password` })
  passwordConfirm: string;
}

export class CreatedUserDto {
  @ApiProperty({ description: `User's email`, example: 'test@gmail.com' })
  email: string;

  @ApiProperty({ description: `Is user's email verified`, example: false })
  isEmailVerified: boolean;

  @ApiProperty({ description: `Is user's account active`, example: true })
  isActive: boolean;

  @ApiProperty({ description: `User's role`, example: 'user' }) // default
  role: UserRole;
}

export class SignUpResponseDto {
  @ApiProperty({ description: 'Create user status', example: 'Success' })
  status: string;
  @ApiProperty({
    description: 'User login token',
    example: 'user token',
  })
  token: string;

  @ApiProperty({ description: `Token expiration date` })
  expireIn: number;

  @ApiProperty({
    description: 'Create user response',
    example: {
      user: userObjectExample,
    },
  })
  data: {
    user: CreatedUserDto;
  };
}

export class LoginUpResponseDto extends SignUpResponseDto {}

export class SigninUserDto {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsNotEmpty()
  @ApiProperty({ description: 'User email', example: 'test@gmail.com' })
  email: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsNotEmpty()
  @ApiProperty({ description: 'User password', example: 'password' })
  password: string;
}

export class SigninUserResponseDto {
  @ApiProperty({ description: 'JWT' })
  token: string;

  @ApiProperty({ description: `Token expiration date` })
  expireIn: number;

  @ApiProperty({ description: 'User data' })
  user: CreatedUserDto;
}
