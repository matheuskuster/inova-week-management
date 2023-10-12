import { User } from '@/application/entities';
import { RepositoryInterface } from '@/types/repositories/repository-contracts';

export abstract class UsersRepository implements RepositoryInterface<User> {
  public abstract create(entity: User): Promise<void>;
  public abstract save(entity: User): Promise<void>;
  public abstract delete(id: string): Promise<void>;
  public abstract findById(id: string): Promise<User | null>;
  public abstract findAll(): Promise<User[]>;
}
