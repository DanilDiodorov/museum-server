import { ApiProperty } from '@nestjs/swagger'

export class ArticleDto {
    @ApiProperty()
    id: string

    @ApiProperty()
    title: string

    @ApiProperty()
    text: string

    @ApiProperty()
    categoryId: string
}
