import { Role as PrismaRole } from '@prisma/client';

import { Role } from '@/application/entities';
import { UniqueEntityId } from '@/types/value-objects';

export class PrismaRoleMapper {
  public static toPrisma(role: Role): PrismaRole {
    return {
      id: role.id,
      description: role.description ?? null,
      name: role.name,
    };
  }

  public static toDomain(role: PrismaRole): Role {
    return new Role(
      {
        name: role.name,
        description: role.description ?? undefined,
      },
      new UniqueEntityId(role.id),
    );
  }
}
