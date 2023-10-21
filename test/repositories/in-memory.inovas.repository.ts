import { Inova } from '@/application/entities';
import { InovasRepository } from '@/application/repositories/inovas.repository';
import { InMemoryRepository } from '@/types/repositories/in-memory.repository';

export class InMemoryInovasRepository
  extends InMemoryRepository<Inova>
  implements InovasRepository
{
  public get inovas(): Inova[] {
    return this.entities;
  }
}
