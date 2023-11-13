import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AddressesModule } from './addresses/addresses.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { OrdersModule } from './orders/orders.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { JwtStrategy } from './auth/strategy';
import { ConfigService } from '@nestjs/config';
import { AuthMiddleware } from './auth/auth.middleware';
import { BlacklistMiddleware } from './auth/blacklist/blacklist.middleware';
import { BlacklistModule } from './auth/blacklist/blacklist.module';
import { BlacklistService } from './auth/blacklist/blacklist.service';

@Module({
  imports: [UsersModule, AddressesModule, SubscriptionsModule, OrdersModule, AuthModule, PrismaModule, BlacklistModule],
  controllers: [AppController],
  providers: [AppService, BlacklistService, JwtStrategy,{
    provide: ConfigService,
    useValue: new ConfigService(),
  },],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      // I was using TWO ways to check for tokens, you can use either but using guard is preferred
      // .apply(AuthMiddleware)
      // .exclude({ path: 'auth/signin', method: RequestMethod.POST },{ path: 'auth/signup', method: RequestMethod.POST } )
      // .forRoutes('*');

      consumer
      .apply(BlacklistMiddleware)
      .forRoutes('*');
  }}
