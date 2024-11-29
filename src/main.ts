import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { urlencoded, json } from 'express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.setGlobalPrefix('/api')
    app.use(cookieParser())
    app.enableCors({
        origin: [
            'http://localhost:3000',
            'https://kutanaschoolmuseum.ru',
            'https://www.kutanaschoolmuseum.ru',
        ],
        credentials: true,
        exposedHeaders: 'set-cookie',
    })
    app.use(json())
    app.use(urlencoded({ extended: true, limit: '50mb' }))
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
        }),
    )
    const config = new DocumentBuilder().setTitle('Museum').build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('doc', app, document)
    await app.listen(5000)
}
bootstrap()
