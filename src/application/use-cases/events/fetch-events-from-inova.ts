import { Injectable } from '@nestjs/common';

import { Event } from '@/application/entities';
import { EventsRepository, InovasRepository } from '@/application/repositories';
import { NotFoundError } from '@/errors/not-found.error';

interface FetchEventsFromInovaRequest {
  inovaId: string;
}

interface FetchEventsFromInovaResponse {
  events: Event[];
}

@Injectable()
export class FetchEventsFromInova {
  constructor(
    private readonly eventsRepository: EventsRepository,
    private readonly inovasRepository: InovasRepository,
  ) {}

  async execute(
    request: FetchEventsFromInovaRequest,
  ): Promise<FetchEventsFromInovaResponse> {
    const foundInova = await this.inovasRepository.findById(request.inovaId);

    if (!foundInova) {
      throw new NotFoundError(
        `Inova with id [${request.inovaId}] was not found`,
      );
    }

    const events = await this.eventsRepository.findManyByInovaId(
      request.inovaId,
    );

    if (events.length === 0) {
      throw new NotFoundError(
        `No events from inova [${request.inovaId}] were found`,
      );
    }

    return {
      events,
    };
  }
}
