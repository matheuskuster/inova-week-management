import { Invite } from '@/application/entities';
import { RepositoryInterface } from '@/types/repositories/repository-contracts';

export abstract class InvitesRepository implements RepositoryInterface<Invite> {
  public abstract create(entity: Invite): Promise<void>;
  public abstract save(entity: Invite): Promise<void>;
  public abstract delete(id: string): Promise<void>;
  public abstract findById(id: string): Promise<Invite | null>;
  public abstract findAll(): Promise<Invite[]>;

  public abstract findByUserId(userId: string): Promise<Invite[]>;
}
