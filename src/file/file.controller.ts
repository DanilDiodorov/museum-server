import {
    Controller,
    Post,
    UseInterceptors,
    UploadedFile,
    Get,
    Param,
    Res,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger'
import { FileDto } from './dto/file.dto'
import { diskStorage } from 'multer'
import { extname, join } from 'path'
import { existsSync } from 'fs'
import { Response } from 'express'
import { ConfigService } from '@nestjs/config'

@ApiTags('File handler')
@Controller('file')
export class FileController {
    constructor(private readonly configService: ConfigService) {}

    @Get(':filename')
    async getFile(@Param('filename') filename: string, @Res() res: Response) {
        const uploadPath = join(__dirname, '..', '..', 'uploads')
        const filePath = join(uploadPath, filename)

        if (!existsSync(filePath)) {
            return res.status(404).send('File not found.')
        }

        return res.download(filePath)
    }

    @Post('upload')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                upload: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @ApiResponse({ type: FileDto })
    @UseInterceptors(
        FileInterceptor('upload', {
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, cb) => {
                    // Generating a 32 random chars long string
                    const randomName = Array(32)
                        .fill(null)
                        .map(() => Math.round(Math.random() * 16).toString(16))
                        .join('')
                    //Calling the callback passing the random name generated with the original extension name
                    cb(null, `${randomName}${extname(file.originalname)}`)
                },
            }),
        }),
    )
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        return {
            url: `${this.configService.get<string>('fileUrl')}/${file.filename}`,
        }
    }
}
