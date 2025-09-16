import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from '../services/user.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}
  @Get()
  getUsers() {
    return this.userService.findAll();
  }

  @Post()
  createUser() {
    return this.userService.createUser({
      email: 's4@gmail.com',
      password: 'hashedpassword',
    });
  }
}
