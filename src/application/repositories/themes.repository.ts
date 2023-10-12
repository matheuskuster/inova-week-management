import { Theme } from '@/application/entities';
import { RepositoryInterface } from '@/types/repositories/repository-contracts';

export abstract class ThemesRepository implements RepositoryInterface<Theme> {
  public abstract create(entity: Theme): Promise<void>;
  public abstract save(entity: Theme): Promise<void>;
  public abstract delete(id: string): Promise<void>;
  public abstract findById(id: string): Promise<Theme | null>;
  public abstract findAll(): Promise<Theme[]>;
}
