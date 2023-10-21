import { Project as PrismaProject } from '@prisma/client';

import { Project } from '@/application/entities';
import { UniqueEntityId } from '@/types/value-objects';

export class PrismaProjectMapper {
  public static toPrisma(project: Project): PrismaProject {
    return {
      id: project.id,
      name: project.name,
      description: project.description,
      approved: project.approved,
      leaderUserId: project.leaderUserId,
      themeId: project.themeId,
      inovaId: project.inovaId,
      stand: project.stand ?? null,
      presentationDay: project.presentationDay ?? null,
      reviewedAt: project.reviewedAt ?? null,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    };
  }

  public static toDomain(project: PrismaProject): Project {
    return new Project(
      {
        name: project.name,
        description: project.description,
        approved: project.approved,
        leaderUserId: project.leaderUserId,
        themeId: project.themeId,
        inovaId: project.inovaId ?? undefined,
        stand: project.stand ?? undefined,
        presentationDay: project.presentationDay ?? undefined,
        reviewedAt: project.reviewedAt ?? undefined,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt,
      },
      new UniqueEntityId(project.id),
    );
  }
}
