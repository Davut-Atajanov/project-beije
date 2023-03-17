import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard';
import { SubscriptionDto } from './dto';
import { SubscriptionsService } from './subscriptions.service';

@ApiBearerAuth('jwt')
@ApiTags("Kullanıcının abone işlemleri")
@Controller('subscriptions')
export class SubscriptionsController {

    constructor(private subscriptionsService: SubscriptionsService){}

    @UseGuards(JwtGuard)
    @ApiOperation({summary : "Kullanıcının abonelik bilgilerini alır"})
    @Get('all')
    getAllSubscriptions(@Req() req){
        return this.subscriptionsService.getAllSubscriptions(req);
    }

    @UseGuards(JwtGuard)
    @ApiOperation({summary : "Kullanıcının yeni aboneliği"})
    @Post('save')
    saveSubscription(@Req() req, @Body() dto: SubscriptionDto){
        return this.subscriptionsService.saveSubscription(req, dto);
    }

    @UseGuards(JwtGuard)
    @ApiOperation({summary : "Kullanıcının aboneliğini silme"})
    @Delete(':id')
    deleteSubscription(@Req() req, @Param('id') id: String){
        return this.subscriptionsService.deleteSubscription(req,id);
    }
}
