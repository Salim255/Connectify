import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('ChatUsers')
@Controller('chatUsers')
export class ChatUsersController {
  constructor() {}
}
