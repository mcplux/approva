import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { validateEnv } from './env.config';
import { AppConfigService } from './config.service';

@Module({
  providers: [AppConfigService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: () => validateEnv(),
    }),
  ],
  exports: [AppConfigService],
})
export class AppConfigModule {}
