import { ApiProperty } from '@nestjs/swagger';
import {IsEmail, IsNotEmpty} from 'class-validator';

export class LoginDto{
    @ApiProperty()
    @IsNotEmpty()
    password: string;
    @ApiProperty({
        example: 'example@gmail.com'//these are the fields filled by default in swagger
    })
    @IsEmail()
    @IsNotEmpty()
    eMail: string;
}