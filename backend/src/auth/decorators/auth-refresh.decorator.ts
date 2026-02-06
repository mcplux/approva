import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export const AuthRefresh = () => {
  return applyDecorators(UseGuards(AuthGuard('jwt-refresh')));
};
