import { Module } from '@nestjs/common';
import { BlacklistModule } from 'src/auth/blacklist/blacklist.module';
import { BlacklistService } from 'src/auth/blacklist/blacklist.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [BlacklistModule],
  controllers: [UsersController],
  providers: [UsersService, BlacklistService]
})
export class UsersModule {}
