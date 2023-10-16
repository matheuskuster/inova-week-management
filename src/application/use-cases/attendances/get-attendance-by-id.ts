import { AttendancesRepository } from '@/application/repositories';
import { NotFoundError } from '@/errors/not-found.error';

export class GetAttendanceById {
  constructor(private readonly attendancesRepository: AttendancesRepository) {}

  async execute({ id }: { id: string }) {
    const attendance = await this.attendancesRepository.findById(id);

    if (!attendance) {
      throw new NotFoundError(`Attendance with id ${id} not found`);
    }

    return {
      attendance,
    };
  }
}
