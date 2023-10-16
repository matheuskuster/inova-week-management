import { makeAttendance } from '@test/factories';
import { InMemoryAttendancesRepository } from '@test/repositories/in-memory.attendances.repository';

import { DeleteAttendance } from './delete-attendance';

import { NotFoundError } from '@/errors/not-found.error';

describe('Delete attendance', () => {
  let attendancesRepository: InMemoryAttendancesRepository;
  let deleteAttendance: DeleteAttendance;

  beforeEach(() => {
    attendancesRepository = new InMemoryAttendancesRepository();
    deleteAttendance = new DeleteAttendance(attendancesRepository);
  });

  it('should be able to delete attendance', async () => {
    const attendance = makeAttendance();
    await attendancesRepository.create(attendance);

    await deleteAttendance.execute({ id: attendance.id });

    const foundAttendances = await attendancesRepository.findAll();
    expect(foundAttendances).toEqual([]);
  });

  it('should throw if attendance does not exist', () => {
    expect(deleteAttendance.execute({ id: '1' })).rejects.toThrow(
      NotFoundError,
    );
  });
});
