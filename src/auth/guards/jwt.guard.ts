import { ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

export class JwtAuthGuard extends AuthGuard('jwt') {
    handleRequest(
        err: any,
        user: any,
        info: any,
        context: ExecutionContext,
        status?: any,
    ) {
        if (info) {
            throw new UnauthorizedException('Не авторизован')
        }
        return super.handleRequest(err, user, info, context, status)
    }
}
