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

    update(id: number, updateCategoryDto: UpdateCategoryDto) {
        return `This action updates a #${id} category`
    }

    remove(id: number) {
        return `This action removes a #${id} category`
    }
}
