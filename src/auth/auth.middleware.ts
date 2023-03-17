import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ConfigService } from "@nestjs/config";
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly configService: ConfigService){};
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      try {
        const decoded = jwt.verify(token, this.configService.get("JWT_SECRET"));
        req.user = decoded;
        next();
      } catch (err) {
        //Invalid token
        res.status(401).send('Token hatası!');
      }
    } else {
      //No token provided
      res.status(401).send('Sisteme giriş yapmanız gerekiyor!');
    }
  }
}