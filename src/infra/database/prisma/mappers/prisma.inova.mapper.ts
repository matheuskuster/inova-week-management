import { Inova as PrismaInova } from '@prisma/client';

import { Inova } from '@/application/entities';
import { UniqueEntityId } from '@/types/value-objects';

export class PrismaInovaMapper {
  public static toPrisma(inova: Inova): PrismaInova {
    return {
      id: inova.id,
      name: inova.name,
      description: inova.description ?? null,
      from: inova.from,
      to: inova.to,
      year: inova.year,
      createdAt: inova.createdAt,
      updatedAt: inova.updatedAt,
    };
  }

  public static toDomain(inova: PrismaInova): Inova {
    return new Inova(
      {
        name: inova.name,
        description: inova.description ?? undefined,
        from: inova.from,
        to: inova.to,
        year: inova.year,
        createdAt: inova.createdAt,
        updatedAt: inova.updatedAt,
      },
      new UniqueEntityId(inova.id),
    );
  }
}
