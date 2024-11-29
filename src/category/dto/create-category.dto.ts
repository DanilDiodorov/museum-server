import { ApiProperty } from '@nestjs/swagger'
import { IsString, MinLength } from 'class-validator'

export class CreateCategoryDto {
    @ApiProperty()
    @IsString()
    @MinLength(2)
    title: string
}
