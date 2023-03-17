import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SubscriptionsService } from './subscriptions.service';

@Injectable()
export class RenewSubscriptionTask {
  constructor(private readonly subscriptionService: SubscriptionsService) {}

//saat akşam 9'da çünkü sistem UTC saat kullanıyor, İstanbul saatinde akşam 00:00 olacak
@Cron(CronExpression.EVERY_DAY_AT_9PM)
// @Cron(CronExpression.EVERY_30_SECONDS)
  async handleCron() {
    await this.subscriptionService.renewExpiredSubscriptions();
  }
}
//just to try