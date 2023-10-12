import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext) {
    return super.canActivate(context) as Promise<boolean>;
  }

  // @ts-expect-error
  async handleRequest(err: Error, user: any, _info: unknown) {
    if (err || !user) {
      throw new UnauthorizedException(err.message);
    }

    return user;
  }
}
