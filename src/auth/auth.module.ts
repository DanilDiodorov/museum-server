import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt.strategy'
import { UserService } from './user.service'
import { DatabaseService } from 'src/database/database.service'
import { ConfigService } from '@nestjs/config'
import { getJwtConfig } from './auth.config'

@Module({
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, UserService, DatabaseService],
    imports: [
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: getJwtConfig,
        }),
    ],
})
export class AuthModule {}
