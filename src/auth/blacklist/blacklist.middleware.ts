import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { BlacklistService } from './blacklist.service';

@Injectable()
export class BlacklistMiddleware implements NestMiddleware {
  constructor(private blacklistService: BlacklistService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      const isBlacklisted = await this.blacklistService.isBlacklisted(token);
      console.log(isBlacklisted);
      if (isBlacklisted) {
        return res.status(401).json({ message: 'Bu token ile artık işlem yapılamaz' });
      }
    }
      next();
  }
}