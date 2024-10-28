import { ApiProperty } from '@nestjs/swagger'
import { ArticleDto } from 'src/article/dto/article.dto'

export class CategoryDto {
    @ApiProperty()
    id: string

    @ApiProperty()
    title: string

    @ApiProperty({ type: [ArticleDto] })
    article: ArticleDto[]
}
