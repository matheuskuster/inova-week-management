import { Injectable } from '@nestjs/common';

import { Event } from '@/application/entities';
import { InovasRepository, EventsRepository } from '@/application/repositories';
import { NotFoundError } from '@/errors/not-found.error';

interface CreateEventRequest {
  name: string;
  description?: string;
  type: string;
  date: string;
  inovaId: string;
}

interface CreateEventResponse {
  event: Event;
}

@Injectable()
export class CreateEvent {
  constructor(
    private readonly eventsRepository: EventsRepository,
    private readonly inovasRepository: InovasRepository,
  ) {}

  public async execute(
    request: CreateEventRequest,
  ): Promise<CreateEventResponse> {
    const inova = await this.inovasRepository.findById(request.inovaId);

    if (!inova) {
      throw new NotFoundError(
        `Inova with id [${request.inovaId}] was not found`,
      );
    }

    const event = new Event({
      name: request.name,
      description: request.description,
      type: request.type,
      date: new Date(request.date),
      inovaId: request.inovaId,
    });

    await this.eventsRepository.create(event);

    return {
      event,
    };
  }
}
