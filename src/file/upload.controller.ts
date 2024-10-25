import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { multerOptions } from './multer.config'

@Controller('file')
export class FileController {
    @Post('upload')
    @UseInterceptors(FileInterceptor('upload', multerOptions))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        return {
            url: `${file.filename}`,
        }
    }
}
