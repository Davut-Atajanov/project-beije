import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { RegisterDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {

    constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService){

    }

    async login(dto: LoginDto){
        //findFirst çünkü e-mail adresler eşsiz
        const user = await this.prisma.user.findFirst({
            where: {
                eMail: dto.eMail
            }
        })

        if(!user) throw new ForbiddenException(
            'E-mail sistemde yok!'
        );

        const pwMatches = await argon.verify(user.hash, dto.password);

        if(!pwMatches) throw new ForbiddenException(
            'Şifre yanlış!'
        );

        delete user.hash;
        delete user.id;
        return {token : await this.signToken(user.id, user.eMail), user : user};
    }

    async signUp(dto: RegisterDto){
        try{
            const hash = await argon.hash(dto.password);
            const user = await this.prisma.user.create({
                data: {
                    eMail: dto.eMail,
                    hash,
                    name: dto.name,
                    surname: dto.surname,
                    phoneNumber: dto.phoneNumber,
                    dateOfBirth: dto.dateOfBirth,
                    subscribedToNewsletter: true,
                }
            });
            delete user.hash;
            return user;

        }catch(error){
            if(error instanceof PrismaClientKnownRequestError)
            throw new ForbiddenException('Data eşsiz olmalı!');
            return 'Data eşsiz olmalı!';
        }
        
    }

    async signToken(userId: number, eMail: string): Promise<{"access_token" : string}>{
        const payload = {
            sub: userId,
            eMail: eMail,
        };
        
        const secret = this.config.get('JWT_SECRET');

        //30 dakikadan sonra yeniden login yapılması gerekiyor
        const token = await this.jwt.signAsync(payload,{
            expiresIn: '30m',
            secret: secret
        });

        return  {access_token : token};
    }
}
