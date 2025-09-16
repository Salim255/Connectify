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
  CreatedUserResponseDto,
  CreateUserDto,
} from '../dto/users.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}
  @Get()
  getUsers() {
    return this.userService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({
    type: CreateUserDto,
    description: 'Data for the new user',
    required: true,
  })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: CreatedUserDto,
  })
  async signUp(@Body() body: CreateUserDto): Promise<CreatedUserResponseDto> {
    //Sanitize and validate input
    const { email, password, passwordConfirm } = body;
    if (password !== passwordConfirm) {
      throw new BadRequestException('Passwords do not match');
    }

    //Create user
    const { token, ...user }: CreatedUserDto & { token: string } =
      await this.userService.createUser({ email, password });

    return {
      status: 'Success',
      token,
      data: { user },
    };
  }
}
