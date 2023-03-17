import { Module } from '@nestjs/common';
import { BlacklistService } from './blacklist.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot()
  ],
  providers: [BlacklistService],
})
export class BlacklistModule {}