import { Controller } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Messages')
@Controller('messages')
export class MessagesController {
    @Post()
    @ApiOperation()
    @ApiBody()
    @ApiResponse()
    createMessage(){
        return 'Hello from create message'
    }
}
