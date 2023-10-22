import { ReviewAnswer as PrismaReviewAnswer } from '@prisma/client';

import { ReviewAnswer } from '@/application/entities';
import { UniqueEntityId } from '@/types/value-objects';

export class PrismaReviewAnswerMapper {
  public static toPrisma(reviewAnswer: ReviewAnswer): PrismaReviewAnswer {
    return {
      id: reviewAnswer.id,
      reviewId: reviewAnswer.reviewId,
      reviewCriteriaId: reviewAnswer.criteriaId,
      value: reviewAnswer.value,
      createdAt: reviewAnswer.createdAt,
      updatedAt: reviewAnswer.updatedAt,
    };
  }

  public static toDomain(reviewAnswer: PrismaReviewAnswer): ReviewAnswer {
    return new ReviewAnswer(
      {
        reviewId: reviewAnswer.reviewId,
        criteriaId: reviewAnswer.reviewCriteriaId,
        value: reviewAnswer.value,
        createdAt: reviewAnswer.createdAt,
      },
      new UniqueEntityId(reviewAnswer.id),
    );
  }
}
