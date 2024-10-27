import { ApiProperty } from '@nestjs/swagger'

export class CategoryDto {
    @ApiProperty()
    id: string

    @ApiProperty()
    title: string
}