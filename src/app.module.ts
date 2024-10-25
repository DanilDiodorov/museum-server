import { Module } from '@nestjs/common'
import { DatabaseModule } from './database/database.module'
import { CategoryModule } from './category/category.module'
import { ArticleModule } from './article/article.module'
import { FileModule } from './file/file.module'

@Module({
    imports: [DatabaseModule, CategoryModule, ArticleModule, FileModule],
})
export class AppModule {}
