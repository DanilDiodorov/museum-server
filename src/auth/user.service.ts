import { Injectable } from '@nestjs/common'
import { hash } from 'argon2'
import { DatabaseService } from 'src/database/database.service'
import { AuthDto } from './dto/auth.dto'

@Injectable()
export class UserService {
    constructor(private databaseService: DatabaseService) {}

    async getUsers() {
        return this.databaseService.user.findMany({
            select: {
                email: true,
                id: true,
                password: false,
            },
        })
    }

    async getById(id: string) {
        return this.databaseService.user.findUnique({
            where: {
                id,
            },
        })
    }

    async getByEmail(email: string) {
        return this.databaseService.user.findUnique({
            where: {
                email,
            },
        })
    }

    async create(dto: AuthDto) {
        // const users = await this.getUsers()

        const user = {
            email: dto.email,
            password: await hash(dto.password),
        }

        return this.databaseService.user.create({
            data: user,
        })
    }
}
