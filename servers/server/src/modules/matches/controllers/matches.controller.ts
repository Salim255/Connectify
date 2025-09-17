import { Controller } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Matches')
@Controller('matches')
export class MatchesController {
    @Post()
    @ApiOperation()
    @ApiBody()
    @ApiResponse()
    intiateMatch(){
        return 'Hello from amtch' 
    }
}