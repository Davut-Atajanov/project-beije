import { Body, Injectable, Req } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderDto } from './dto';

@Injectable()
export class OrdersService {

  constructor(private prisma: PrismaService) { }

  async getAllOrders(@Req() req) {

    try {
      const { orderHistory } = await this.prisma.user.findFirst({
        where: {
          eMail: req.user.eMail
        },
        include: {
          orderHistory: {
            select: {
              standardPad: true,
              superPad: true,
              superPlusPad: true,
              beijeTampon: true
            }
          }
        }
      });

      return orderHistory;
    } catch (error) {
      return error;
    }
  }

  async saveOrder(@Req() req, @Body() dto: OrderDto) {

    try {

      const myUser = await this.prisma.user.findFirst({
        where: {
          eMail: req.user.eMail
        }
      });

      //I just made up the calculation
      const orderPriceCalculator = (dto.beijeTampon * 15) + (dto.standardPad * 20) + (dto.superPad * 23) + (dto.superPlusPad * 26);
      const order = await this.prisma.order.create({
        data: {
          beijeTampon: dto.beijeTampon,
          standardPad: dto.standardPad,
          superPad: dto.superPad,
          superPlusPad: dto.superPlusPad,
          orderPrice: orderPriceCalculator,
          user: {
            connect: {
              id: myUser.id
            }
          },
        }
      });

      delete order.userId;

      return order;
    } catch (error) {
      return error;
    }
  }


}
