import { Body, Controller, Delete, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard';
import { AddressesService } from './addresses.service';
import { AddressDto, AddressUpdateDto } from './dto';

@ApiBearerAuth('jwt')
@ApiTags("Kullanıcının adres işlemleri") //this will be written in Bold letters in swagger, at the top of section
@Controller('address')
export class AddressesController {

    constructor(private readonly addressesService: AddressesService) {}

    @UseGuards(JwtGuard)
    @ApiOperation({summary: "Kullanıcının adresini alma"}) //save the address of the User
    @Get('')
    getAddress(@Req() req){
        return this.addressesService.getAddress(req);
    }

    @UseGuards(JwtGuard)
    @ApiOperation({summary: "Kullanıcının adresini kayıtlama"}) //save the address of the User
    @Post('save')
    addressRegister(@Req() req, @Body() dto: AddressDto){
        return this.addressesService.registerAddress(req, dto);
    }

    @UseGuards(JwtGuard)
    @ApiOperation({summary: "Kullanıcının adresini silme"}) //delete the address of the User
    @Delete('delete')
    deleteAddress(@Req() req){
        return this.addressesService.deleteAddress(req);
    }

    @UseGuards(JwtGuard)
    @ApiOperation({summary: "Kullanıcının adresini güncelleme"}) //update User's address
    @Put('update')
    updateAddress(@Req() req, @Body() dto: AddressUpdateDto){
        return this.addressesService.updateAddress(req, dto);
    }
}
