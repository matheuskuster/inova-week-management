import { Invite } from '@/application/entities';
import { InvitesRepository } from '@/application/repositories';
import { InMemoryRepository } from '@/types/repositories/in-memory.repository';

export class InMemoryInvitesRepository
  extends InMemoryRepository<Invite>
  implements InvitesRepository
{
  public get invites(): Invite[] {
    return this.entities;
  }

  public async findByUserId(userId: string): Promise<Invite[]> {
    return this.invites.filter((invite) => invite.userId === userId);
  }
}
