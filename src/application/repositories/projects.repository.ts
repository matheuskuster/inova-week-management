import { Project } from '@/application/entities';
import { RepositoryInterface } from '@/types/repositories/repository-contracts';

export abstract class ProjectsRepository
  implements RepositoryInterface<Project>
{
  public abstract create(entity: Project): Promise<void>;
  public abstract save(entity: Project): Promise<void>;
  public abstract delete(id: string): Promise<void>;
  public abstract findById(id: string): Promise<Project | null>;
  public abstract findAll(): Promise<Project[]>;

  public abstract findManyByInovaId(inovaId: string): Promise<Project[]>;
}
