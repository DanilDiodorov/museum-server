import { Module } from '@nestjs/common'
import { DatabaseModule } from './database/database.module'
import { CategoryModule } from './category/category.module'
import { ArticleModule } from './article/article.module'
import { FileModule } from './file/file.module'
import { ConfigModule } from '@nestjs/config'
import configuration from './config/configuration'
import { AuthModule } from './auth/auth.module'
import * as Joi from 'joi';

@Module({
    imports: [
        ConfigModule.forRoot({
            validationSchema: Joi.object({
                NODE_ENV: Joi.string()
                  .valid('development', 'production', 'test', 'provision')
                  .default('development'),
                PORT: Joi.number().port().default(5000),
              }),
            isGlobal: true,
            envFilePath: ['.env'],
            load: [configuration],
        }),
        DatabaseModule,
        CategoryModule,
        ArticleModule,
        FileModule,
        AuthModule,
    ],
})
export class AppModule {}
