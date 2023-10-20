import { Event as PrismaEvent } from '@prisma/client';

import { Event } from '@/application/entities';
import { UniqueEntityId } from '@/types/value-objects';

export class PrismaEventMapper {
  public static toPrisma(event: Event): PrismaEvent {
    return {
      id: event.id,
      date: event.date,
      description: event.description ?? null,
      inovaId: event.inovaId,
      name: event.name,
      type: event.type,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt,
    };
  }

  public static toDomain(event: PrismaEvent): Event {
    return new Event(
      {
        inovaId: event.inovaId,
        name: event.name,
        description: event.description ?? undefined,
        type: event.type,
        date: event.date,
        createdAt: event.createdAt,
        updatedAt: event.updatedAt,
      },
      new UniqueEntityId(event.id),
    );
  }
}
