import { Injectable } from '@nestjs/common'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { DatabaseService } from 'src/database/database.service'

@Injectable()
export class CategoryService {
    constructor(private readonly databaseService: DatabaseService) {}

    create(createCategoryDto: CreateCategoryDto) {
        return this.databaseService.category.create({
            data: createCategoryDto,
        })
    }

    findAll() {
        return this.databaseService.category.findMany({
            include: {
                article: true,
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

    remove(id: string) {
        return this.databaseService.category.delete({
            where: {
                id,
            },
        })
    }
}
