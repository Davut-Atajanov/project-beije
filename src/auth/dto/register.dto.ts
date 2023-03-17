import { ApiProperty } from '@nestjs/swagger';
import {IsEmail, IsNotEmpty} from 'class-validator';

export class RegisterDto{
    @ApiProperty()
    @IsNotEmpty()
    name: string;
    @ApiProperty()
    @IsNotEmpty()
    surname: string;
    @ApiProperty()
    @IsNotEmpty()
    password: string;
    @ApiProperty({
        example: 'example@gmail.com' //these are the fields filled by default in swagger
    })
    @IsEmail()
    @IsNotEmpty()
    eMail: string;
    @ApiProperty({
        example: '5551112233'
    })
    @IsNotEmpty()
    phoneNumber: string;
    @ApiProperty()
    @IsNotEmpty()
    dateOfBirth: Date;
}