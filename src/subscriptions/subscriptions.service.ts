import { Body, Injectable, Req } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SubscriptionDto } from './dto';

@Injectable()
export class SubscriptionsService {

    constructor(private prisma: PrismaService) { }

    async getAllSubscriptions(@Req() req) {
        try {
            const { subscription } = await this.prisma.user.findFirst({
                where: {
                    eMail: req.user.eMail
                },
                include: {
                    subscription: {
                        select: {
                            id: true,
                            subscriptionType: true,
                            subscriptionPrice: true,
                            standardPad: true,
                            superPad: true,
                            superPlusPad: true,
                            beijeTampon: true,
                            endDate: true
                        }
                    }
                }
            });

            return subscription;
        } catch (error) {
            return error;
        }
    }

    async saveSubscription(@Req() req, @Body() dto: SubscriptionDto) {
        try {

            const myUser = await this.prisma.user.findFirst({
                where: {
                    eMail: req.user.eMail
                }
            });

            //I just made up the calculation
            const orderPriceCalculator = (dto.beijeTampon * 15) + (dto.standardPad * 20) + (dto.superPad * 23) + (dto.superPlusPad * 26);

            const createdDate = new Date(Date.now());
            // const options = { timeZone: 'Europe/Istanbul'};
            // const istanbulTime = createdDate.toLocaleString('en-US', options);
            // console.log(istanbulTime);

            const endDate  = new Date(createdDate);
            endDate.setMonth(endDate.getMonth() + 2);
            // const endDateTimestamp = endDate.getTime();

            const subscription = await this.prisma.subscription.create({
                data: {
                    beijeTampon: dto.beijeTampon,
                    standardPad: dto.standardPad,
                    superPad: dto.superPad,
                    superPlusPad: dto.superPlusPad,
                    subscriptionPrice: orderPriceCalculator,
                    startDate: createdDate,
                    subscriptionType: { type: "normal" },
                    endDate: endDate,
                    user: {
                        connect: {
                            id: myUser.id
                        }
                    },
                }
            });

            return subscription;
        } catch (error) {
            return error;
        }
    }

    async deleteSubscription(@Req() req, id: String){

        var myId: number = +id;

        try{
            const subscription = this.prisma.subscription.delete({
                where:{
                    id: myId
                }
            })

            return subscription;
        }catch(error){
            return error;
        }
    }
}
