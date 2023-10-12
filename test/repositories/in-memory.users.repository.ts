import { User } from '@/application/entities';
import { UsersRepository } from '@/application/repositories';
import { InMemoryRepository } from '@/types/repositories/in-memory.repository';

export class InMemoryUsersRepository
  extends InMemoryRepository<User>
  implements UsersRepository
{
  public get users(): User[] {
    return this.entities;
  }
}
