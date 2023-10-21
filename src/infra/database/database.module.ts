import { Module } from '@nestjs/common';

import {
  PrismaAttendancesRepository,
  PrismaEventsRepository,
  PrismaReviewCriteriasRepository,
  PrismaRolesRepository,
  PrismaService,
  PrismaThemesRepository,
  PrismaUsersRepository,
  PrismaInvitesRepository,
  PrismaInovasRepository,
  PrismaProjectsRepository,
} from './prisma';

import {
  AttendancesRepository,
  EventsRepository,
  RolesRepository,
  ThemesRepository,
  UsersRepository,
  ReviewsCriteriasRepository,
  InvitesRepository,
  InovasRepository,
  ProjectsRepository,
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
      useClass: PrismaInvitesRepository,
    },
    {
      provide: InovasRepository,
      useClass: PrismaInovasRepository,
    },
    {
      provide: ProjectsRepository,
      useClass: PrismaProjectsRepository,
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
    InovasRepository,
    ProjectsRepository,
    PrismaService,
  ],
})
export class DatabaseModule {}
