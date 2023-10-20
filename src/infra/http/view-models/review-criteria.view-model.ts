import { ReviewCriteria } from '@/application/entities';

export class ReviewCriteriaViewModel {
  public static toHTTP(reviewCriteria: ReviewCriteria) {
    return {
      id: reviewCriteria.id,
      name: reviewCriteria.question,
    };
  }
}
