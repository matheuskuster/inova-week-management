import { Event } from '@/application/entities';
import { EventsRepository } from '@/application/repositories';
import { InMemoryRepository } from '@/types/repositories/in-memory.repository';

export class InMemoryEventsRepository
   extends InMemoryRepository<Event>
   implements EventsRepository {
   public get events(): Event[] {
      return this.entities;
   }
}
