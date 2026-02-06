import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { CreateUserDto, LoginDto } from './dto';
import { GetUser } from './decorators/get-user.decorator';
import { Auth } from './decorators/auth.decorator';
import { User } from './entities/user.entity';
import { AuthRefresh } from './decorators/auth-refresh.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Auth()
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetUser() user: User) {
    return this.authService.logout(user);
  }

  @AuthRefresh()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refresh(@GetUser() user: User) {
    return this.authService.refreshToken(user);
  }
}
