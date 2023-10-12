import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TerminusModule } from '@nestjs/terminus';
import { ThrottlerModule } from '@nestjs/throttler';

import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { CryptoEncryptService } from '../services/encrypt/crypto.encrypt.service';
import { NestJWTService } from '../services/jwt/nest.jwt.service';

import { EncryptService, JWTService } from '@/application/services';
import * as useCases from '@/application/use-cases';
import { DatabaseModule } from '@/infra/database/database.module';
import * as controllers from '@/infra/http/controllers';

@Module({
  imports: [
    DatabaseModule,
    TerminusModule,
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60,
          limit: 10,
        },
        {
          ttl: 3600,
          limit: 100,
        },
      ],
    }),
  ],
  controllers: [...Object.values(controllers)],
  providers: [
    ...Object.values(useCases),

    LocalStrategy,
    JwtStrategy,

    {
      provide: EncryptService,
      useClass: CryptoEncryptService,
    },
    {
      provide: JWTService,
      useClass: NestJWTService,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class HttpModule {}
