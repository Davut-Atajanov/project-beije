import { Body, Controller, Delete, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard';
import { UserDto } from './dto';
import { UsersService } from './users.service';

@ApiBearerAuth('jwt')
@ApiTags("Kullanıcının profil işlemleri")
@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @UseGuards(JwtGuard)
    @ApiOperation({summary: "Kullanıcının profilini silme"}) //delete the address of the User
    @Delete('delete')
    deleteAddress(@Req() req){
        return this.usersService.deleteUserProfile(req);
    }

    @UseGuards(JwtGuard)
    @ApiOperation({summary: "Kullanıcının profilini güncelleme"}) //update User's address
    @Put('update')
    updateUserProfile(@Req() req, @Body() dto: UserDto){
        return this.usersService.updateUserProfile(req, dto);
    }
}
