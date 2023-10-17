import { Attendance } from '@/application/entities';
import {
  AttendancesRepository,
  EventsRepository,
  UsersRepository,
} from '@/application/repositories';
import { NotFoundError } from '@/errors/not-found.error';

interface CreateAttendanceRequest {
  eventId: string;
  userId: string;
}

export class CreateAttendance {
  constructor(
    private readonly attendancesRepository: AttendancesRepository,
    private readonly eventsRepository: EventsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute({ eventId, userId }: CreateAttendanceRequest) {
    const event = await this.eventsRepository.findById(eventId);

    if (!event) {
      throw new NotFoundError(`Event with id ${eventId} not found`);
    }

    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new NotFoundError(`User with id ${userId} not found`);
    }

    const attendance = new Attendance({
      eventId,
      userId,
    });

    await this.attendancesRepository.create(attendance);

    return {
      attendance,
    };
  }
}
