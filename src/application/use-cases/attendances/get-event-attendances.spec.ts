import { makeAttendance, makeEvent } from '@test/factories';
import {
  InMemoryAttendancesRepository,
  InMemoryEventsRepository,
} from '@test/repositories';

import { GetEventAttendances } from './get-event-attendances';

import { NotFoundError } from '@/errors/not-found.error';

describe('Get event attendances', () => {
  let attendancesRepository: InMemoryAttendancesRepository;
  let eventsRepository: InMemoryEventsRepository;
  let getEventAttendances: GetEventAttendances;

  beforeEach(() => {
    attendancesRepository = new InMemoryAttendancesRepository();
    eventsRepository = new InMemoryEventsRepository();
    getEventAttendances = new GetEventAttendances(
      attendancesRepository,
      eventsRepository,
    );
  });

  it('should throw if event does not exist', async () => {
    await expect(
      getEventAttendances.execute({
        eventId: '1',
      }),
    ).rejects.toThrow(NotFoundError);
  });

  it('should get event attendances', async () => {
    const event = makeEvent();
    await eventsRepository.create(event);

    const attendance = makeAttendance({ eventId: event.id });

    await attendancesRepository.create(attendance);

    const { attendances } = await getEventAttendances.execute({
      eventId: event.id,
    });

    expect(attendances).toEqual([attendance]);
  });

  it('should not get attendances from other events', async () => {
    const event = makeEvent();
    await eventsRepository.create(event);

    const otherEvent = makeEvent();
    await eventsRepository.create(otherEvent);

    const attendance = makeAttendance({ eventId: event.id });
    const otherAttendance = makeAttendance({ eventId: otherEvent.id });

    await attendancesRepository.create(attendance);
    await attendancesRepository.create(otherAttendance);

    const { attendances } = await getEventAttendances.execute({
      eventId: event.id,
    });

    expect(attendances).toEqual([attendance]);
  });
});
