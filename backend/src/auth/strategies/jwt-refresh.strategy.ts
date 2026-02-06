import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../types/jwt-payload.type';
import { AuthService } from '../auth.service';
import { AppConfigService } from 'src/config/config.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: AppConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_REFRESH_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      passReqToCallback: false,
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { sub, tv } = payload;

    const user = await this.authService.findUserById(sub);
    if (!user || user.tokenVersion !== tv) {
      throw new ForbiddenException('Invalid token');
    }

    return user;
  }
}
