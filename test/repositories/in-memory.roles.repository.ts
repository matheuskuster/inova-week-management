import { Role } from '@/application/entities';
import { RolesRepository } from '@/application/repositories';
import { InMemoryRepository } from '@/types/repositories/in-memory.repository';

export class InMemoryRolesRepository
  extends InMemoryRepository<Role>
  implements RolesRepository
{
  public get roles(): Role[] {
    return this.entities;
  }

  public async findByName(name: string): Promise<Role | null> {
    const foundRole = this.roles.find((role) => role.name === name);

    if (!foundRole) {
      return null;
    }

    return foundRole;
  }
}
