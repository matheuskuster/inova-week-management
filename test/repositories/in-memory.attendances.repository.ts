import { Attendance } from '@/application/entities';
import { AttendancesRepository } from '@/application/repositories';
import { InMemoryRepository } from '@/types/repositories/in-memory.repository';

export class InMemoryAttendancesRepository
  extends InMemoryRepository<Attendance>
  implements AttendancesRepository
{
  public get attendances(): Attendance[] {
    return this.entities;
  }

  public async findByEventId(eventId: string): Promise<Attendance[]> {
    return this.entities.filter((attendance) => attendance.eventId === eventId);
  }

  public async findByUserId(userId: string): Promise<Attendance[]> {
    return this.entities.filter((attendance) => attendance.userId === userId);
  }
}
