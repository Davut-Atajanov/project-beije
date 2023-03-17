import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { JwtGuard } from './auth/guard';

@ApiBearerAuth('jwt')
@ApiTags("Default Test")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  @UseGuards(JwtGuard)
  @ApiOperation({summary: "Get Hello"})
  @Get()
  getHello(@Req() req): string {
    return this.appService.getHello(req);
  }
}
