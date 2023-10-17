import { Module } from '@nestjs/common';
import { InMemoryEventsRepository } from '@test/repositories/in-memory.events.repository';
import { InMemoryRolesRepository } from '@test/repositories/in-memory.roles.repository';
import { InMemoryThemesRepository } from '@test/repositories/in-memory.themes.repository';
import { InMemoryUsersRepository } from '@test/repositories/in-memory.users.repository';
import { InMemoryReviewCriteriasRepository } from '@test/repositories/in-memory.review-criterias';

import {
  EventsRepository,
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
      provide: EventsRepository,
      useClass: InMemoryEventsRepository,
    },
  ],
  exports: [
    RolesRepository,
    UsersRepository,
    ThemesRepository,
    EventsRepository,
  ],
})
export class DatabaseModule { }
