import { makeAttendance, makeUser } from '@test/factories';
import { InMemoryAttendancesRepository } from '@test/repositories/in-memory.attendances.repository';
import { InMemoryUsersRepository } from '@test/repositories/in-memory.users.repository';

import { GetUserAttendances } from './get-user-attendances';

describe('Get user attendances', () => {
  let attendancesRepository: InMemoryAttendancesRepository;
  let usersRepository: InMemoryUsersRepository;
  let getUserAttendances: GetUserAttendances;

  beforeEach(() => {
    attendancesRepository = new InMemoryAttendancesRepository();
    usersRepository = new InMemoryUsersRepository();
    getUserAttendances = new GetUserAttendances(
      usersRepository,
      attendancesRepository,
    );
  });

  it('should throw if user does not exist', async () => {
    await expect(
      getUserAttendances.execute({
        userId: '1',
      }),
    ).rejects.toThrow();
  });

  it('should get user attendances', async () => {
    const user = makeUser();
    await usersRepository.create(user);

    const attendance = makeAttendance({
      userId: user.id,
      eventId: 'any-event-id',
    });

    await attendancesRepository.create(attendance);

    const { attendances } = await getUserAttendances.execute({
      userId: user.id,
    });

    expect(attendances).toEqual([attendance]);
  });
});
