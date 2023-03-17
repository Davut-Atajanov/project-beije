import { Body, Injectable, Req } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddressDto, AddressUpdateDto } from './dto';

@Injectable()
export class AddressesService {

    constructor(private prisma: PrismaService) {

    }

    async registerAddress(@Req() req, @Body() dto: AddressDto) {

        try {
            //findFirst çünkü e-mail adresler eşsiz
            const myUser = await this.prisma.user.findFirst({
                where: {
                    eMail: req.user.eMail
                }
            })

            const address = await this.prisma.address.create({
                data: {
                    city: dto.city,
                    district: dto.district,
                    fullAddress: dto.fullAddress,
                    postalCode: dto.postalCode,
                    user: {
                        connect: {
                            id: myUser.id
                        }
                    },
                }
            });
            return address;
        } catch (error) {
            if (error.code === 'P2014')
                return "Sistemte olan bir adresiniz var!";
            return error;
        }


    }

    async getAddress(@Req() req){
        try{
            const user = await this.prisma.user.findUnique({
                where: {
                    eMail: req.user.eMail
                },
                include: {
                    address: true // Include the user's address in the query result
                }
            });

            const address = await this.prisma.address.findFirst({
                where : {
                    id: user.address.id
                }
            })

            delete address.id;
            delete address.userId;

            return {"address" : address};
        }catch(error){
            return error;
        }
    }

    async deleteAddress(@Req() req) {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    eMail: req.user.eMail
                },
                include: {
                    address: true // Include the user's address in the query result
                }
            });

            if (!user.address) {
                // User's address does not exist
                return { error: 'Kullanıcının tanımlı bir adresi yok!' };
            }

            const deletedAddress = await this.prisma.address.delete({
                where: {
                    id: user.address.id
                }
            });

            return {message : "Adres başarıyla silindi!"};

        } catch (error) {
            return { error: error.message };
        }
    }

    async updateAddress(@Req() req, @Body() dto: AddressUpdateDto) {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    eMail: req.user.eMail
                },
                include: {
                    address: true // Include the user's address in the query result
                }
            });

            if (!user.address) {
                // User's address does not exist
                return { error: 'Kullanıcının tanımlı bir adresi yok!' };
            }

            var counter = 4;
            const data = {};
            if (dto.district !== "") {
                data["district"] = dto.district;
                counter--;
            }
            if (dto.city !== "") {
                data["city"] = dto.city;
                counter--;
            }
            if (dto.fullAddress !== "") {
                data["fullAddress"] = dto.fullAddress;
                counter--;
            }
            if (dto.postalCode !== "") {
                data["postalCode"] = dto.postalCode;
                counter--;
            }

            if(counter === 4 )
                return {error: "Tüm seçenekler boş yollandı!"};

            const updatedAddress = await this.prisma.address.update({
                where: {
                    id: user.address.id
                },
                data
            });



            return {message: "Adres başarıyla güncellendi!",
                    content: updatedAddress};

        } catch (error) {
            return { error: error.message };
        }
    }
}
