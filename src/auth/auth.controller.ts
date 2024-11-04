import {
    Body,
    Controller,
    Get,
    HttpCode,
    Post,
    Req,
    Res,
    UnauthorizedException,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { AuthService } from './auth.service'
import { AuthDto, AuthResponseDto } from './dto/auth.dto'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { UserDto } from './dto/user.dto'
import { CurrentUser } from './decorators/user.decorator'
import { Auth } from './decorators/auth.decorator'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Auth()
    @Get('session')
    @ApiOkResponse({ type: UserDto })
    async session(@CurrentUser() user: UserDto) {
        return user
    }

    @HttpCode(200)
    @Post('login')
    @ApiOkResponse({ type: AuthResponseDto })
    async login(
        @Body() dto: AuthDto,
        @Res({ passthrough: true }) res: Response,
    ) {
        const { refreshToken, ...response } = await this.authService.login(dto)

        this.authService.addRefreshTokenToResponse(res, refreshToken)

        return response
    }

    @HttpCode(200)
    @Post('register')
    @ApiOkResponse({ type: AuthResponseDto })
    async register(
        @Body() dto: AuthDto,
        @Res({ passthrough: true }) res: Response,
    ) {
        const { refreshToken, ...response } =
            await this.authService.register(dto)
        this.authService.addRefreshTokenToResponse(res, refreshToken)
        return response
    }

    @HttpCode(200)
    @Post('login/access-token')
    @ApiOkResponse({ type: AuthResponseDto })
    async getNewTokens(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
    ) {
        const refreshTokenFromCookies =
            req.cookies[this.authService.REFRESH_TOKEN_NAME]

        if (!refreshTokenFromCookies) {
            this.authService.removeRefreshTokenFromResponse(res)
            throw new UnauthorizedException('Refresh token not passed')
        }

        const { refreshToken, ...response } =
            await this.authService.getNewTokens(refreshTokenFromCookies)

        this.authService.addRefreshTokenToResponse(res, refreshToken)

        return response
    }

    @HttpCode(200)
    @Post('logout')
    async logout(@Res({ passthrough: true }) res: Response) {
        this.authService.removeRefreshTokenFromResponse(res)

        return true
    }
}
