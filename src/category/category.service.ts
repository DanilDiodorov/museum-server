import { Injectable } from '@nestjs/common'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { DatabaseService } from 'src/database/database.service'
import { UpdateCategoryIndexDto } from './dto/update-category-index.dto'

@Injectable()
export class CategoryService {
    constructor(private readonly databaseService: DatabaseService) {}

    async create(createCategoryDto: CreateCategoryDto) {
        const newIndex = await this.databaseService.category.count()

        return this.databaseService.category.create({
            data: {
                index: newIndex + 1,
                ...createCategoryDto,
            },
        })
    }

    findAll() {
        return this.databaseService.category.findMany({
            orderBy: {
                index: 'asc',
            },
            include: {
                article: {
                    orderBy: {
                        index: 'asc',
                    },
                },
            },
        })
    }

    findOne(id: number) {
        return `This action returns a #${id} category`
    }

    update(id: string, updateCategoryDto: UpdateCategoryDto) {
        return this.databaseService.category.update({
            where: {
                id,
            },
            data: updateCategoryDto,
        })
    }

    async updateIndex(categories: UpdateCategoryIndexDto[]) {
        const updatePromises = categories.map((category, index) => {
            return this.databaseService.category.update({
                where: { id: category.id },
                data: { index },
            })
        })

        await Promise.all(updatePromises)
        return true
    }

    remove(id: string) {
        return this.databaseService.category.delete({
            where: {
                id,
            },
        })
    }
}
