import { Role } from '@/application/entities';
import { RepositoryInterface } from '@/types/repositories/repository-contracts';

export abstract class RolesRepository implements RepositoryInterface<Role> {
  public abstract create(entity: Role): Promise<void>;
  public abstract save(entity: Role): Promise<void>;
  public abstract delete(id: string): Promise<void>;
  public abstract findById(id: string): Promise<Role | null>;
  public abstract findAll(): Promise<Role[]>;

  public abstract findByName(name: string): Promise<Role | null>;
  public abstract findManyByNames(names: string[]): Promise<Role[]>;
}
