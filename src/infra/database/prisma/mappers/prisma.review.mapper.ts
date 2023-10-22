import { Review as PrismaReview } from '@prisma/client';

import { Review } from '@/application/entities';
import { UniqueEntityId } from '@/types/value-objects';

export class PrismaReviewMapper {
  public static toPrisma(review: Review): PrismaReview {
    return {
      id: review.id,
      userId: review.userId,
      projectId: review.projectId,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
    };
  }

  public static toDomain(criteria: PrismaReview): Review {
    return new Review(
      {
        userId: criteria.userId,
        projectId: criteria.projectId,
        createdAt: criteria.createdAt,
        updatedAt: criteria.updatedAt,
      },
      new UniqueEntityId(criteria.id),
    );
  }
}
