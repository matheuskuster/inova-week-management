import { Event } from '@/application/entities';
import { RepositoryInterface } from '@/types/repositories/repository-contracts';

export abstract class EventsRepository implements RepositoryInterface<Event> {
  public abstract create(entity: Event): Promise<void>;
  public abstract save(entity: Event): Promise<void>;
  public abstract delete(id: string): Promise<void>;
  public abstract findById(id: string): Promise<Event | null>;
  public abstract findAll(): Promise<Event[]>;

  public abstract findManyByInovaId(inovaId: string): Promise<Event[]>;
}
