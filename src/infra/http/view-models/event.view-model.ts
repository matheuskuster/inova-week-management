import { Event } from '@/application/entities';

export class EventViewModel {
  public static toHTTP(event: Event) {
    return {
      id: event.id,
      name: event.name,
      descripiton: event.description,
    };
  }
}
