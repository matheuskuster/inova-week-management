import { Injectable } from '@nestjs/common';

import { PrismaAttendanceMapper } from '../mappers/prisma.attendance.mapper';
import { PrismaService } from '../prisma.service';

import { Attendance } from '@/application/entities';
import { AttendancesRepository } from '@/application/repositories';

@Injectable()
export class PrismaAttendancesRepository implements AttendancesRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async create(attendance: Attendance): Promise<void> {
    const raw = PrismaAttendanceMapper.toPrisma(attendance);
    await this.prisma.attendance.create({ data: raw });
  }

  public async save(attendance: Attendance): Promise<void> {
    const raw = PrismaAttendanceMapper.toPrisma(attendance);
    await this.prisma.attendance.upsert({
      where: { id: attendance.id },
      create: raw,
      update: raw,
    });
  }

  public async delete(id: string): Promise<void> {
    await this.prisma.attendance.delete({ where: { id } });
  }

  public async findById(id: string): Promise<Attendance | null> {
    const attendance = await this.prisma.attendance.findUnique({
      where: { id },
    });

    return attendance ? PrismaAttendanceMapper.toDomain(attendance) : null;
  }

  public async findAll(): Promise<Attendance[]> {
    const attendances = await this.prisma.attendance.findMany();
    return attendances.map(PrismaAttendanceMapper.toDomain);
  }

  public async findByUserId(userId: string): Promise<Attendance[]> {
    const attendances = await this.prisma.attendance.findMany({
      where: { userId },
    });

    return attendances.map(PrismaAttendanceMapper.toDomain);
  }

  public async findByEventId(eventId: string): Promise<Attendance[]> {
    const attendances = await this.prisma.attendance.findMany({
      where: { eventId },
    });

    return attendances.map(PrismaAttendanceMapper.toDomain);
  }
}
