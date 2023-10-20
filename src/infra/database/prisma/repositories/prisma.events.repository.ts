import { Injectable } from '@nestjs/common';

import { PrismaEventMapper } from '../mappers/prisma.event.mapper';
import { PrismaService } from '../prisma.service';

import { Event } from '@/application/entities';
import { EventsRepository } from '@/application/repositories';

@Injectable()
export class PrismaEventsRepository implements EventsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(event: Event): Promise<void> {
    const raw = PrismaEventMapper.toPrisma(event);
    await this.prisma.event.create({ data: raw });
  }

  async save(event: Event): Promise<void> {
    const raw = PrismaEventMapper.toPrisma(event);
    await this.prisma.event.upsert({
      where: { id: event.id },
      create: raw,
      update: raw,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.event.delete({ where: { id } });
  }

  async findById(id: string): Promise<Event | null> {
    const event = await this.prisma.event.findUnique({
      where: { id },
    });

    if (!event) {
      return null;
    }

    return PrismaEventMapper.toDomain(event);
  }

  async findAll(): Promise<Event[]> {
    const events = await this.prisma.event.findMany();
    return events.map((event) => PrismaEventMapper.toDomain(event));
  }
}
