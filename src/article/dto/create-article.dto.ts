import { ApiProperty } from '@nestjs/swagger'
import { IsString, MinLength } from 'class-validator'

export class CreateArticleDto {
    @ApiProperty()
    @IsString()
    @MinLength(2)
    title: string

    @ApiProperty()
    @IsString()
    @MinLength(2)
    text: string

    @ApiProperty()
    @IsString()
    @MinLength(2)
    categoryId: string

    @ApiProperty()
    @IsString()
    description?: string
}
