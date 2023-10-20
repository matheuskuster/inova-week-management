import { Module } from '@nestjs/common';
import { InMemoryEventsRepository } from '@test/repositories/in-memory.events.repository';
import { InMemoryInvitesRepository } from '@test/repositories/in-memory.invites.repository';
import { InMemoryReviewCriteriasRepository } from '@test/repositories/in-memory.review-criterias';
import { InMemoryRolesRepository } from '@test/repositories/in-memory.roles.repository';
import { InMemoryThemesRepository } from '@test/repositories/in-memory.themes.repository';
import { InMemoryUsersRepository } from '@test/repositories/in-memory.users.repository';

import {
  EventsRepository,
  RolesRepository,
  ThemesRepository,
  UsersRepository,
  ReviewsCriteriasRepository,
} from '@/application/repositories';
import { InviteRepository } from '@/application/repositories/invitesRepository';

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
    {
      provide: ReviewsCriteriasRepository,
      useClass: InMemoryReviewCriteriasRepository,
    },
    {
      provide: InviteRepository,
      useClass: InMemoryInvitesRepository,
    },
  ],
  exports: [
    RolesRepository,
    UsersRepository,
    ThemesRepository,
    EventsRepository,
    ReviewsCriteriasRepository,
  ],
})
export class DatabaseModule {}
