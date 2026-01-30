import { Injectable } from '@nestjs/common';
import { validateEnv } from './env.config';
import { Env } from './env.schema';

@Injectable()
export class AppConfigService {
  private readonly env: Env;

  constructor() {
    this.env = validateEnv();
  }

  get<T extends keyof Env>(key: T): Env[T] {
    return this.env[key];
  }
}
