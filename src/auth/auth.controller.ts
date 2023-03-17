import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto';
import { LoginDto } from './dto/login.dto';

@ApiTags("Kullanıcının sistem işlemleri")
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @ApiOperation({summary : "Kullanıcının sisteme giriş işlemi"})
    @Post('signin')
    signin(@Body() dto: LoginDto){
        return this.authService.login(dto);
    }

    @ApiOperation({summary : "Kullanıcının sisteme kayıt olmasını sağlar"})
    @Post('signup')
    signup(@Body() dto: RegisterDto){
        return this.authService.signUp(dto);
    }
}
