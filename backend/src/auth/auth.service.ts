import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { QueryFailedError, Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { CreateUserDto, LoginDto } from './dto';
import { AppConfigService } from 'src/config/config.service';
import { JwtPayload } from './types/jwt-payload.type';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: AppConfigService,
  ) {}

  private readonly logger = new Logger('AuthService');

  async create(createUserDto: CreateUserDto) {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const user = this.userRepository.create({
        ...createUserDto,
        password: hashedPassword,
      });

      await this.userRepository.save(user);

      const { accessToken, refreshToken } = await this.generateTokens(
        user.id,
        user.email,
        user.tokenVersion,
      );

      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        'code' in error &&
        error.code === '23505'
      ) {
        throw new BadRequestException(
          `User with email ${createUserDto.email} already exist`,
        );
      }

      this.logger.log(error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    user.lastLogin = new Date();
    await this.userRepository.save(user);

    const { accessToken, refreshToken } = await this.generateTokens(
      user.id,
      user.email,
      user.tokenVersion,
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  async logout(user: User) {
    try {
      user.tokenVersion += 1;
      await this.userRepository.save(user);

      return {
        message: 'User logged out successfully',
      };
    } catch (error) {
      this.logger.error(error);
    }
  }

  private async generateTokens(sub: string, email: string, tv: number) {
    const payload: JwtPayload = { sub, email, tv };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync<JwtPayload>(payload, {
        secret: this.configService.get('JWT_ACCESS_SECRET'),
        expiresIn: this.configService.get('JWT_ACCESS_EXPIRES_IN'),
      }),
      this.jwtService.signAsync<JwtPayload>(payload, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN'),
      }),
    ]);

    return { accessToken, refreshToken };
  }
}
