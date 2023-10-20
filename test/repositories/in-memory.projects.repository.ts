import { Project } from '@/application/entities';
import { ProjectsRepository } from '@/application/repositories/projects.repository';
import { InMemoryRepository } from '@/types/repositories/in-memory.repository';

export class InMemoryProjectsRepository
  extends InMemoryRepository<Project>
  implements ProjectsRepository
{
  public get projects(): Project[] {
    return this.entities;
  }

  public async findManyByInovaId(inovaId: string): Promise<Project[]> {
    return this.entities.filter(
      (project) => project.inovaId === inovaId && project.approved,
    );
  }
}
