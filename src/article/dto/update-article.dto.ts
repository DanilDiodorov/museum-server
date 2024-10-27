import { PartialType } from '@nestjs/mapped-types'
import { CreateArticleDto } from './create-article.dto'
import { ApiPropertyOptional } from '@nestjs/swagger'

export class UpdateArticleDto {
    id: string

    @ApiPropertyOptional({ required: false })
    title: string

    @ApiPropertyOptional({ required: false })
    text: string

    @ApiPropertyOptional({ required: false })
    categoryId: string
}
