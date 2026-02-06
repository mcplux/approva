import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';

export const GetUser = createParamDecorator((_, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest<Express.Request>();
  const user = req.user;

  if (!user) {
    throw new InternalServerErrorException('User not found in request');
  }

  return user;
});
