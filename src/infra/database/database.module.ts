import { Module } from '@nestjs/common';
import { InMemoryRolesRepository } from '@test/repositories/in-memory.roles.repository';
import { InMemoryThemesRepository } from '@test/repositories/in-memory.themes.repository';
import { InMemoryUsersRepository } from '@test/repositories/in-memory.users.repository';
import { InMemoryReviewCriteriasRepository } from '@test/repositories/in-memory.review-criterias';

import {
  RolesRepository,
  ThemesRepository,
  UsersRepository,
  ReviewsCriteriasRepository,
} from '@/application/repositories';

@Module({
  providers: [
    {
      provide: RolesRepository,
      useClass: InMemoryRolesRepository,
    },
    {
      provide: UsersRepository,
      useClass: InMemoryUsersRepository,
    },
    {
      provide: ThemesRepository,
      useClass: InMemoryThemesRepository,
    },
    {
      provide: ReviewsCriteriasRepository,
      useClass: InMemoryReviewCriteriasRepository,
    },
  ],
  exports: [RolesRepository, UsersRepository, ThemesRepository, ReviewsCriteriasRepository],
})
export class DatabaseModule {}
