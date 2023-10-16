import { Attendance } from '@/application/entities';
import { RepositoryInterface } from '@/types/repositories/repository-contracts';

export abstract class AttendancesRepository
  implements RepositoryInterface<Attendance>
{
  public abstract create(entity: Attendance): Promise<void>;
  public abstract save(entity: Attendance): Promise<void>;
  public abstract delete(id: string): Promise<void>;
  public abstract findById(id: string): Promise<Attendance | null>;
  public abstract findAll(): Promise<Attendance[]>;

  public abstract findByEventId(eventId: string): Promise<Attendance[]>;
  public abstract findByUserId(userId: string): Promise<Attendance[]>;
}
