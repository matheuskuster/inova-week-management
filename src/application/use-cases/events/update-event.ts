import { EventsRepository } from '@/application/repositories';
import { NotFoundError } from '@/errors/not-found.error';

interface UpdateEventRequest {
  id: string;
  date?: Date;
  name?: string;
  description?: string;
  place?: string;
  type?: string;
}

export class UpdateEvent {
  constructor(private readonly eventsRepository: EventsRepository) {}

  async execute({ id, ...request }: UpdateEventRequest) {
    const event = await this.eventsRepository.findById(id);

    if (!event) {
      throw new NotFoundError(`Event with id ${id} not found`);
    }

    event.update({
      date: request.date,
      description: request.description,
      name: request.name,
      type: request.type,
    });

    await this.eventsRepository.save(event);

    return {
      event,
    };
  }
}
