import { makeEvent, makeUser } from '@test/factories';
import {
  InMemoryAttendancesRepository,
  InMemoryEventsRepository,
  InMemoryUsersRepository,
} from '@test/repositories';

import { CreateAttendance } from './create-attendance';

describe('Create attendance', () => {
  let attendancesRepository: InMemoryAttendancesRepository;
  let eventsRepository: InMemoryEventsRepository;
  let usersRepository: InMemoryUsersRepository;
  let createAttendance: CreateAttendance;

  beforeEach(() => {
    attendancesRepository = new InMemoryAttendancesRepository();
    eventsRepository = new InMemoryEventsRepository();
    usersRepository = new InMemoryUsersRepository();
    createAttendance = new CreateAttendance(
      attendancesRepository,
      eventsRepository,
      usersRepository,
    );
  });

  it('should throw if event does not exist', async () => {
    await expect(
      createAttendance.execute({
        eventId: '1',
        userId: '1',
      }),
    ).rejects.toThrow();
  });

  it('should throw if user does not exist', async () => {
    const event = makeEvent();
    await eventsRepository.create(event);

    await expect(
      createAttendance.execute({
        eventId: event.id,
        userId: '1',
      }),
    ).rejects.toThrow();
  });

  it('should create attendance', async () => {
    const event = makeEvent();
    await eventsRepository.create(event);

    const user = makeUser();
    await usersRepository.create(user);

    await createAttendance.execute({
      eventId: event.id,
      userId: user.id,
    });

    const attendances = await attendancesRepository.findAll();
    expect(attendances).toHaveLength(1);
    expect(attendances[0].eventId).toEqual(event.id);
    expect(attendances[0].userId).toEqual(user.id);
  });
});
