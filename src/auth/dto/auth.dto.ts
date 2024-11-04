import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, MinLength } from 'class-validator'
import { UserDto } from './user.dto'

export class AuthDto {
    @ApiProperty()
    @IsEmail()
    email: string

    @ApiProperty()
    @MinLength(6, {
        message: 'Password must be at least 6 characters long',
    })
    @IsString()
    password: string
}

export class AuthResponseDto {
    @ApiProperty()
    user: UserDto

    @ApiProperty()
    accessToken: string
}
