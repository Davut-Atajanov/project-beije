import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty} from 'class-validator';

export class OrderDto{
    @ApiProperty({
        example: "0" //these are the fields filled by default in swagger
    })
    @IsNotEmpty()
    standardPad: number;
    @ApiProperty({
        example: "0"
    })
    @IsNotEmpty()
    superPad: number;
    @ApiProperty({
        example: "0"
    })
    @IsNotEmpty()
    superPlusPad: number;
    @ApiProperty({
        example: "0"
    })
    @IsNotEmpty()
    beijeTampon: number;
}