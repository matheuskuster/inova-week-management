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
}
