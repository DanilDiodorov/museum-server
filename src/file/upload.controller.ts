import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { multerOptions } from './multer.config'
import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger'
import { FileDto } from './dto/file.dto'

@ApiTags('File handler')
@Controller('file')
export class FileController {
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @Post('upload')
    @ApiResponse({ type: FileDto })
    @UseInterceptors(FileInterceptor('file', multerOptions))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        return {
            url: `${file.filename}`,
        }
    }
}
