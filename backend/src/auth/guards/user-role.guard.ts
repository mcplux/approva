import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_ROLES } from '../decorators/auth.decorator';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles: string[] = this.reflector.get(
      META_ROLES,
      context.getHandler(),
    );

    if (!validRoles || validRoles.length === 0) {
      return true;
    }

    const req = context.switchToHttp().getRequest<Express.Request>();
    const user = req.user as User;
    if (!user) {
      throw new ForbiddenException('User not found in request');
    }

    if (!validRoles.includes(user.userRole)) {
      throw new ForbiddenException(
        `User needs a valid role: ${validRoles.toString()}`,
      );
    }

    return true;
  }
}
