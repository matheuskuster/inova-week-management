import {
  AttendancesRepository,
  EventsRepository,
} from '@/application/repositories';
import { NotFoundError } from '@/errors/not-found.error';

interface GetEventAttendancesRequest {
  eventId: string;
}

export class GetEventAttendances {
  constructor(
    private readonly attendancesRepository: AttendancesRepository,
    private readonly eventsRepository: EventsRepository,
  ) {}

  async execute({ eventId }: GetEventAttendancesRequest) {
    const event = await this.eventsRepository.findById(eventId);

    if (!event) {
      throw new NotFoundError(`Event with id ${eventId} not found`);
    }

    const attendances = await this.attendancesRepository.findByEventId(eventId);

    return {
      attendances,
    };
  }
}
