import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common'
import { CategoryService } from './category.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CategoryDto } from './dto/category.dto'

@ApiTags('Category')
@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Post()
    @ApiResponse({ type: CategoryDto })
    create(@Body() createCategoryDto: CreateCategoryDto) {
        return this.categoryService.create(createCategoryDto)
    }

    @Get()
    @ApiResponse({ type: [CategoryDto] })
    findAll() {
        return this.categoryService.findAll()
    }

    @Get(':id')
    @ApiResponse({ type: CategoryDto })
    @ApiParam({ name: 'id', required: true })
    findOne(@Param('id') id: string) {
        return this.categoryService.findOne(+id)
    }

    @Patch(':id')
    @ApiResponse({ type: CategoryDto })
    @ApiParam({ name: 'id', required: true })
    update(
        @Param('id') id: string,
        @Body() updateCategoryDto: UpdateCategoryDto,
    ) {
        return this.categoryService.update(+id, updateCategoryDto)
    }

    @Delete(':id')
    @ApiResponse({ type: CategoryDto })
    @ApiParam({ name: 'id', required: true })
    remove(@Param('id') id: string) {
        return this.categoryService.remove(id)
    }
}
