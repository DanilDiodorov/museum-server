import { ApiProperty } from '@nestjs/swagger'

export class CreateArticleDto {
    @ApiProperty()
    title: string

    @ApiProperty()
    text: string

    @ApiProperty()
    categoryId: string

    @ApiProperty()
    description?: string
}
