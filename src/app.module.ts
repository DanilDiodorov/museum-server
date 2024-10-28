import { Module } from '@nestjs/common'
import { DatabaseModule } from './database/database.module'
import { CategoryModule } from './category/category.module'
import { ArticleModule } from './article/article.module'
import { FileModule } from './file/file.module'
import { ConfigModule } from '@nestjs/config'
import configuration from './config/configuration'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
        }),
        DatabaseModule,
        CategoryModule,
        ArticleModule,
        FileModule,
    ],
})
export class AppModule {}
