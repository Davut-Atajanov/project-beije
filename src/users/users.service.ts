import { Body, Injectable, Req } from '@nestjs/common';
import { BlacklistService } from 'src/auth/blacklist/blacklist.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto';

@Injectable()
export class UsersService {

    constructor(private prisma: PrismaService,
        private blacklistService: BlacklistService) {}

    async deleteUserProfile(@Req() req) {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    eMail: req.user.eMail
                },
                include: {
                    address: true
                }
            });

            const deletedProfile = await this.prisma.user.delete({
                where: {
                    eMail: req.user.eMail, 
                }
            })

            

            const authHeader = req.headers.authorization;
            const token = authHeader.split(' ')[1];
    
            const isTokenBlacklisted = await this.blacklistService.addToBlacklist(token);
    


            return {message : "Profile başarıyla silindi!"};

        } catch (error) {
            return { error: error.message };
        }
    }

    async updateUserProfile(@Req() req, @Body() dto: UserDto) {
        try {

            const data = {};
            if (dto.name !== "") {
                data["name"] = dto.name;
            }
            if (dto.surname !== "") {
                data["surname"] = dto.surname;
            }
            if (dto.subscribedToNewsletter !== null) {
                data["subscribedToNewsletter"] = dto.subscribedToNewsletter;
            }

            const updatedProfile = await this.prisma.user.update({
                where: {
                    eMail: req.user.eMail
                },
                data
            });

            delete updatedProfile.hash;
            delete updatedProfile.id;

            return {message: "Profil başarıyla güncellendi!",
                    content: updatedProfile};

        } catch (error) {
            return { error: error.message };
        }
    }

    // async deleteAddress(@Req() req){
        
    //     const user = await this.prisma.user.findUnique({
    //         where: {
    //             eMail: req.user.eMail
    //         },
    //         include: {
    //             address: true
    //         }
    //     });

    //     const deletedAddress = await this.prisma.address.delete({
    //         where: {
    //             id: user.address.id
    //         }
    //     });

    //     return {message : "Adres başarıyla silindi!"};
    // }
}
