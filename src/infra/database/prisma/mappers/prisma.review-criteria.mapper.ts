import { ReviewCriteria as PrismaReviewCriteria } from '@prisma/client';

import { ReviewCriteria } from '@/application/entities';
import { UniqueEntityId } from '@/types/value-objects';

export class PrismaReviewCriteriaMapper {
  public static toPrisma(criteria: ReviewCriteria): PrismaReviewCriteria {
    return {
      id: criteria.id,
      inovaId: criteria.inovaId,
      question: criteria.question,
    };
  }

  public static toDomain(criteria: PrismaReviewCriteria): ReviewCriteria {
    return new ReviewCriteria(
      {
        inovaId: criteria.inovaId,
        question: criteria.question,
      },
      new UniqueEntityId(criteria.id),
    );
  }
}
