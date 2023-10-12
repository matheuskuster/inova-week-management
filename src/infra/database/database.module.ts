import { Module } from '@nestjs/common';
import { InMemoryRolesRepository } from '@test/repositories/in-memory.roles.repository';
import { InMemoryUsersRepository } from '@test/repositories/in-memory.users.repository';

import { RolesRepository, UsersRepository } from '@/application/repositories';

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
  ],
  exports: [RolesRepository, UsersRepository],
})
export class DatabaseModule {}
