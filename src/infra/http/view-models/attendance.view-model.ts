import { Attendance } from '@/application/entities';

export class AttendanceViewModel {
  public static toHTTP(attendance: Attendance) {
    return {
      id: attendance.id,
      user: attendance.userId,
      event: attendance.eventId,
      createdAt: attendance.createdAt,
    };
  }
}
