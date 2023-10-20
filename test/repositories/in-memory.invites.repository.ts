import { Invite } from '@/application/entities';
import { InviteRepository } from '@/application/repositories/invitesRepository';
import { InMemoryRepository } from '@/types/repositories/in-memory.repository';

export class InMemoryInvitesRepository
  extends InMemoryRepository<Invite>
  implements InviteRepository
{
  public get invite(): Invite[] {
    return this.entities;
  }
}
