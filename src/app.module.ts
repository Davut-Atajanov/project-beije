import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AddressesModule } from './addresses/addresses.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { OrdersController } from './orders/orders.controller';
import { OrdersModule } from './orders/orders.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, AddressesModule, SubscriptionsModule, OrdersModule, AuthModule],
  controllers: [AppController, OrdersController],
  providers: [AppService],
})
export class AppModule {}
