import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { urlencoded, json } from 'express'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.setGlobalPrefix('/api')
    app.enableCors({
        origin: ['http://localhost:5001'],
        credentials: true,
        exposedHeaders: 'set-cookie',
    })
    app.use(json({ limit: '50mb' }))
    app.use(urlencoded({ extended: true, limit: '50mb' }))
    await app.listen(5000)
}
bootstrap()
