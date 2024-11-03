import { Injectable } from '@nestjs/common'
import { CreateArticleDto } from './dto/create-article.dto'
import { UpdateArticleDto } from './dto/update-article.dto'
import { rusToLat } from 'src/utils/rus-to-lat'
import { DatabaseService } from 'src/database/database.service'
import { UpdateArticleIndexDto } from './dto/update-article-index.dto'

@Injectable()
export class ArticleService {
    constructor(private readonly databaseService: DatabaseService) {}

    async create(createArticleDto: CreateArticleDto) {
        const newIndex = await this.databaseService.article.count({
            where: {
                categoryId: createArticleDto.categoryId,
            },
        })

        return this.databaseService.article.create({
            data: {
                id: rusToLat(createArticleDto.title),
                title: createArticleDto.title,
                text: createArticleDto.text,
                index: newIndex + 1,
                description: createArticleDto.description,
                category: {
                    connect: {
                        id: createArticleDto.categoryId,
                    },
                },
            },
        })
    }

    findAll() {
        return this.databaseService.article.findMany({
            orderBy: {
                index: 'asc',
            },
        })
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

    async updateIndex(articles: UpdateArticleIndexDto[]) {
        const updatePromises = articles.map((article, index) => {
            return this.databaseService.article.update({
                where: { id: article.id },
                data: { index },
            })
        })

        await Promise.all(updatePromises)
        return true
    }

    remove(id: string) {
        return this.databaseService.article.delete({
            where: {
                id,
            },
        })
    }
}
