import { Attendance, AttendanceProps } from '@/application/entities';
import { Override } from '@/types/ts-helpers';
import { UniqueEntityId } from '@/types/value-objects';

export function makeAttendance(overrides?: Override<AttendanceProps>) {
  return new Attendance(
    {
      eventId: 'any_event_id',
      userId: 'any_user_id',
      ...overrides,
    },
    new UniqueEntityId(overrides?.id),
  );
}
