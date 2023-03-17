import { Body, Controller, Delete, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard';
import { OrderDto } from './dto';
import { OrdersService } from './orders.service';

@ApiBearerAuth('jwt')
@ApiTags("Kullanıcının sipariş işlemleri")
@Controller('orders')
export class OrdersController {

    constructor(private readonly ordersService: OrdersService){}

    @UseGuards(JwtGuard)
    @ApiOperation({summary : "Kullanıcının geçmiş tüm siparişlerini alır"})
    @Get('all')
    getAllOrders(@Req() req){
        return this.ordersService.getAllOrders(req);
    }

    @UseGuards(JwtGuard)
    @ApiOperation({summary : "Kullanıcının sipariş vermesini sağlar"})
    @Post('save')
    saveOrder(@Req() req, @Body() dto: OrderDto){
        return this.ordersService.saveOrder(req, dto);
    }

}
