import { Invite as PrismaInvite } from '@prisma/client';

import { Invite } from '@/application/entities';
import { UniqueEntityId } from '@/types/value-objects';

export class PrismaInviteMapper {
  public static toPrisma(invite: Invite): PrismaInvite {
    return {
      id: invite.id,
      userId: invite.userId,
      projectId: invite.projectId,
      acceptedAt: invite.acceptedAt ?? null,
      createdAt: invite.createdAt,
      updatedAt: invite.updatedAt,
    };
  }

  public static toDomain(invite: PrismaInvite): Invite {
    return new Invite(
      {
        userId: invite.userId,
        projectId: invite.projectId,
        acceptedAt: invite.acceptedAt ?? undefined,
        createdAt: invite.createdAt,
        updatedAt: invite.updatedAt,
      },
      new UniqueEntityId(invite.id),
    );
  }
}
