import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional} from 'class-validator';

export class UserDto{
    @IsOptional()
    @ApiProperty({
        example: "" //will not update if sent empty
    })
    name: string;
    @IsOptional()
    @ApiProperty({
        example: ""
    })
    surname: string;
    @IsOptional()
    @ApiProperty({
        example: true
    })
    subscribedToNewsletter: boolean;
}