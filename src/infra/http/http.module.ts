import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { ThrottlerModule } from '@nestjs/throttler';

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
  providers: [...Object.values(useCases)],
})
export class HttpModule {}
