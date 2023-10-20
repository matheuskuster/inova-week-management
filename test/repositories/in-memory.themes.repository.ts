import { Theme } from '@/application/entities';
import { ThemesRepository } from '@/application/repositories';
import { InMemoryRepository } from '@/types/repositories/in-memory.repository';

export class InMemoryThemesRepository
  extends InMemoryRepository<Theme>
  implements ThemesRepository
{
  public get themes(): Theme[] {
    return this.entities;
  }

  public async findManyByInovaId(inovaId: string): Promise<Theme[]> {
    return this.entities.filter((theme) => theme.inovaId === inovaId);
  }
}
