import { Injectable } from '@nestjs/common';
import { makeEvent } from '@test/factories/event.factory';

import { EventsRepository } from '@/application/repositories';
import { NotFoundError } from '@/errors/not-found.error';

interface GetEventByIdRequest {
  id: string;
}

@Injectable()
export class GetEventById {
  constructor(private readonly eventsRepository: EventsRepository) { }

  async execute(request: GetEventByIdRequest) {
    const foundEvent = await this.eventsRepository.findById(request.id);

    if (!foundEvent) {
      throw new NotFoundError(`Event with id ${request.id} not found`);
    }

    return {
      event: foundEvent,
    };
  }
}
