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

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) ?? null;
  }

  async findByPhone(phone: string): Promise<User | null> {
    return this.users.find((user) => user.phone === phone) ?? null;
  }

  async findByRegistration(registration: string): Promise<User | null> {
    return (
      this.users.find((user) => user.registration === registration) ?? null
    );
  }
}
