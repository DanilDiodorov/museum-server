import { Module } from '@nestjs/common'
import { FileController } from './upload.controller'

@Module({
    controllers: [FileController],
})
export class FileModule {}
