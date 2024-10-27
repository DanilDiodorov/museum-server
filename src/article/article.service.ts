import { Injectable } from '@nestjs/common'
import { CreateArticleDto } from './dto/create-article.dto'
import { UpdateArticleDto } from './dto/update-article.dto'
import { rusToLat } from 'src/utils/rus-to-lat'
import { DatabaseService } from 'src/database/database.service'

@Injectable()
export class ArticleService {
    constructor(private readonly databaseService: DatabaseService) {}

    create(createArticleDto: CreateArticleDto) {
        return this.databaseService.article.create({
            data: {
                id: rusToLat(createArticleDto.title),
                title: createArticleDto.title,
                text: createArticleDto.text,
                category: {
                    connect: {
                        id: createArticleDto.categoryId,
                    },
                },
            },
        })
    }

    findAll() {
        return this.databaseService.article.findMany()
    }

    findOne(id: string) {
        return this.databaseService.article.findUnique({
            where: {
                id,
            },
        })
    }

    update(id: string, updateArticleDto: UpdateArticleDto) {
        updateArticleDto.id = rusToLat(updateArticleDto.title)
        return this.databaseService.article.update({
            where: {
                id,
            },
            data: updateArticleDto,
        })
    }

    remove(id: string) {
        return this.databaseService.article.delete({
            where: {
                id,
            },
        })
    }
}
