import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CreatedUserDto,
  CreateUserDto,
  LoginUpResponseDto,
  SigninUserDto,
  SignUpResponseDto,
} from '../dto/users.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}
  @Get()
  getUsers() {
    return this.userService.findAll();
  }

  @Post('signup')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({
    type: CreateUserDto,
    description: 'Data for the new user',
    required: true,
  })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: SignUpResponseDto,
  })
  async signUp(@Body() body: CreateUserDto): Promise<SignUpResponseDto> {
    //Sanitize and validate input
    const { email, password, passwordConfirm } = body;
    if (password !== passwordConfirm) {
      throw new BadRequestException('Passwords do not match');
    }

    //Create user
    const {
      token,
      expireIn,
      ...user
    }: CreatedUserDto & { token: string } & { expireIn: number } =
      await this.userService.createUser({ email, password, passwordConfirm });

    return {
      status: 'Success',
      token,
      expireIn,
      data: { user },
    };
  }

  @Post('login')
  @ApiOperation({ summary: 'Log in user' })
  @ApiBody({
    type: SigninUserDto,
    description: 'User login credentials',
    required: true,
  })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: LoginUpResponseDto,
  })
  async login(@Body() body: SigninUserDto): Promise<LoginUpResponseDto> {
    //Sanitize and validate input
    const { email, password } = body;
    if (!password || !email) {
      throw new BadRequestException('Please provide valid email and password');
    }

    //Create user
    const result: CreatedUserDto & { token: string } & { expireIn: number } =
      await this.userService.loginUser({ email, password });
    const { token, expireIn, ...user } = result;

    return {
      status: 'Success',
      token,
      expireIn,
      data: { user },
    };
  }
}
