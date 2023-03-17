import { Injectable, Req } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(@Req() req): string {
    return `Hello: ${req.user.eMail} \nAPI Was made by Davut Atajanov\nFor all questions refer to my GitHub page\nYou will find my linkedIn there`;
  }
}
