import { ApiProperty } from '@nestjs/swagger'

export class ArticleDto {
    @ApiProperty()
    id: string

    @ApiProperty()
    title: string

    @ApiProperty()
    text: string

    @ApiProperty()
    description?: string

    @ApiProperty()
    categoryId: string

    @ApiProperty()
    index: number
}
