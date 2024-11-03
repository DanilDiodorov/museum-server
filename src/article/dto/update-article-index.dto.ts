import { ApiProperty } from '@nestjs/swagger'

export class UpdateArticleIndexDto {
    @ApiProperty()
    id: string
}
