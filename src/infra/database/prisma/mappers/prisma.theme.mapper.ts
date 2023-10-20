import { Theme as PrismaTheme } from '@prisma/client';

import { Theme } from '@/application/entities';
import { UniqueEntityId } from '@/types/value-objects';

export class PrismaThemeMapper {
  public static toPrisma(theme: Theme): PrismaTheme {
    return {
      id: theme.id,
      description: theme.description ?? null,
      inovaId: theme.inovaId,
      name: theme.name,
      createdAt: theme.createdAt,
      updatedAt: theme.updatedAt,
    };
  }

  public static toDomain(theme: PrismaTheme): Theme {
    return new Theme(
      {
        inovaId: theme.inovaId,
        name: theme.name,
        description: theme.description ?? undefined,
        createdAt: theme.createdAt,
        updatedAt: theme.updatedAt,
      },
      new UniqueEntityId(theme.id),
    );
  }
}
