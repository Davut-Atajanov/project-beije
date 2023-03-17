import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class AddressUpdateDto{
    @IsOptional()
    @ApiProperty({
        example: "" //will not update if sent empty
    })
    city: string;
    @IsOptional()
    @ApiProperty({
        example: ""
    })
    district: string;
    @IsOptional()
    @ApiProperty({
        example: ""
    })
    fullAddress: string;
    @IsOptional()
    @ApiProperty({
        example: ""
    })
    postalCode: string;
}