import { ReviewCriteria, ReviewCriteriaProps } from '@/application/entities';
import { Override } from '@/types/ts-helpers';
import { UniqueEntityId } from '@/types/value-objects';

export function makeReviewCriteria(overrides?: Override<ReviewCriteriaProps>) {
  return new ReviewCriteria(
    {
      inovaId: '123456',
      question: 'Review Criteria',
      ...overrides,
    },
    new UniqueEntityId(overrides?.id),
  );
}
