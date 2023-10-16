import { EventsRepository } from '@/application/repositories';
import { NotFoundError } from '@/errors/not-found.error';

interface DeleteEventRequest {
  id: string;
}

export class DeleteEvent {
  constructor(private readonly eventsRepository: EventsRepository) {}

  async execute({ id }: DeleteEventRequest) {
    const event = await this.eventsRepository.findById(id);

    if (!event) {
      throw new NotFoundError(`Event with id ${id} not found`);
    }

    await this.eventsRepository.delete(id);
  }
}
