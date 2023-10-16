import { makeAttendance } from '@test/factories';
import { InMemoryAttendancesRepository } from '@test/repositories/in-memory.attendances.repository';

import { GetAttendanceById } from './get-attendance-by-id';

import { NotFoundError } from '@/errors/not-found.error';

describe('Get attendance by id', () => {
  let attendancesRepository: InMemoryAttendancesRepository;
  let getAttendanceById: GetAttendanceById;

  beforeEach(() => {
    attendancesRepository = new InMemoryAttendancesRepository();
    getAttendanceById = new GetAttendanceById(attendancesRepository);
  });

  it('should be able to get attendance by id', async () => {
    const attendance = makeAttendance();
    await attendancesRepository.create(attendance);

    const { attendance: foundAttendance } = await getAttendanceById.execute({
      id: attendance.id,
    });

    expect(foundAttendance).toEqual(attendance);
  });

  it('should not be able to get attendance by id if attendance does not exists', async () => {
    await expect(getAttendanceById.execute({ id: '1' })).rejects.toThrow(
      NotFoundError,
    );
  });
});
