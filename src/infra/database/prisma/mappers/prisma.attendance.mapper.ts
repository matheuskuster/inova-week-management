import { Attendance as PrismaAttendance } from '@prisma/client';

import { Attendance } from '@/application/entities';
import { UniqueEntityId } from '@/types/value-objects';

export class PrismaAttendanceMapper {
  public static toPrisma(attendance: Attendance): PrismaAttendance {
    return {
      eventId: attendance.eventId,
      id: attendance.id,
      userId: attendance.userId,
      createdAt: attendance.createdAt,
      updatedAt: attendance.updatedAt,
    };
  }

  public static toDomain(attendance: PrismaAttendance): Attendance {
    return new Attendance(
      {
        eventId: attendance.eventId,
        userId: attendance.userId,
        createdAt: attendance.createdAt,
        updatedAt: attendance.updatedAt,
      },
      new UniqueEntityId(attendance.id),
    );
  }
}
