import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Put,
} from '@nestjs/common'
import { ArticleService } from './article.service'
import { CreateArticleDto } from './dto/create-article.dto'
import { UpdateArticleDto } from './dto/update-article.dto'
import {
    ApiBody,
    ApiOkResponse,
    ApiParam,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger'
import { ArticleDto } from './dto/article.dto'
import { UpdateArticleIndexDto } from './dto/update-article-index.dto'

@ApiTags('Article')
@Controller('article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}

    @Post()
    @ApiOkResponse({ type: ArticleDto })
    create(@Body() createArticleDto: CreateArticleDto) {
        return this.articleService.create(createArticleDto)
    }

    @Get()
    @ApiOkResponse({ type: [ArticleDto] })
    findAll() {
        return this.articleService.findAll()
    }

    @Get(':id')
    @ApiParam({ name: 'id', required: true })
    @ApiOkResponse({ type: ArticleDto })
    findOne(@Param('id') id: string) {
        return this.articleService.findOne(id)
    }

    @Patch(':id')
    @ApiOkResponse({ type: ArticleDto })
    @ApiParam({ name: 'id', required: true })
    update(
        @Param('id') id: string,
        @Body() updateArticleDto: UpdateArticleDto,
    ) {
        return this.articleService.update(id, updateArticleDto)
    }

    @Put('index')
    @ApiResponse({ status: 200 })
    @ApiBody({ type: [UpdateArticleIndexDto] })
    updateIndex(@Body() items: UpdateArticleIndexDto[]) {
        return this.articleService.updateIndex(items)
    }

    @Delete(':id')
    @ApiOkResponse({ type: ArticleDto })
    @ApiParam({ name: 'id', required: true })
    remove(@Param('id') id: string) {
        return this.articleService.remove(id)
    }
}
