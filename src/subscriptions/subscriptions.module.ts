import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionsController } from './subscriptions.controller';
import { RenewSubscriptionTask } from './renewSubscriptionTask.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [SubscriptionsService, RenewSubscriptionTask],
  controllers: [SubscriptionsController]
})
export class SubscriptionsModule {}
