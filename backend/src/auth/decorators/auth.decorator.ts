import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserRole } from '../entities/user.entity';
import { UserRoleGuard } from '../guards/user-role.guard';

export const META_ROLES = 'roles';

export const Auth = (...args: UserRole[]) => {
  return applyDecorators(
    SetMetadata(META_ROLES, args),
    UseGuards(AuthGuard('jwt'), UserRoleGuard),
  );
};
