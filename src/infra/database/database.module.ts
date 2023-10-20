import { Module } from '@nestjs/common';
import { InMemoryInvitesRepository } from '@test/repositories/in-memory.invites.repository';

import {
  PrismaAttendancesRepository,
  PrismaEventsRepository,
  PrismaReviewCriteriasRepository,
  PrismaRolesRepository,
  PrismaService,
  PrismaThemesRepository,
  PrismaUsersRepository,
} from './prisma';

import {
  AttendancesRepository,
  EventsRepository,
  RolesRepository,
  ThemesRepository,
  UsersRepository,
  ReviewsCriteriasRepository,
  InvitesRepository,
} from '@/application/repositories';

@Module({
  providers: [
    PrismaService,
    {
      provide: RolesRepository,
      useClass: PrismaRolesRepository,
    },
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: ThemesRepository,
      useClass: PrismaThemesRepository,
    },
    {
      provide: EventsRepository,
      useClass: PrismaEventsRepository,
    },
    {
      provide: AttendancesRepository,
      useClass: PrismaAttendancesRepository,
    },
    {
      provide: ReviewsCriteriasRepository,
      useClass: PrismaReviewCriteriasRepository,
    },
    {
      provide: InvitesRepository,
      useClass: InMemoryInvitesRepository,
    },
  ],
  exports: [
    RolesRepository,
    UsersRepository,
    ThemesRepository,
    EventsRepository,
    AttendancesRepository,
    ReviewsCriteriasRepository,
    InvitesRepository,
    PrismaService,
  ],
})
export class DatabaseModule {}
