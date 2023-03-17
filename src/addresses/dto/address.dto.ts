import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty} from 'class-validator';

export class AddressDto{
    @ApiProperty({
        example: "Ankara" //these are the fields filled by default in swagger
    })
    @IsNotEmpty()
    city: string;
    @ApiProperty({
        example: "Çankaya"
    })
    @IsNotEmpty()
    district: string;
    @ApiProperty({
        example: "Mahalle, sokak 15, Ev 76"
    })
    @IsNotEmpty()
    fullAddress: string;
    @ApiProperty({
        example: "55232"
    })
    @IsNotEmpty()
    postalCode: string;
}