import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class BlacklistService {
  constructor(private prisma: PrismaService) {}

  async addToBlacklist(token: string){
    console.log("inside addToBlacklist");
    console.log(token);
    console.log(this.prisma.blacklistedToken);
    const result = await this.prisma.blacklistedToken.create({
      data: {
        token,
      }
    });
    return result;
  }

  async isBlacklisted(token: string) {
    const result = await this.prisma.blacklistedToken.findFirst({
      where: {
        token
      }
    });
    
    return (result !== null) && (result !== undefined);
  }

  async removeFromBlacklist(token: string){
    await this.prisma.blacklistedToken.delete({
      where: {
        token
      }
    });
  }
}