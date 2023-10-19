import { ReviewsCriteriasRepository } from '@/application/repositories/review-criterias.repository';
import { NotFoundError } from '@/errors/not-found.error';

interface DeleteReviewCriteriaRequest {
  id: string;
}

export class DeleteReviewCriteria {
  constructor(
    private readonly reviewCriteriaRepository: ReviewsCriteriasRepository,
  ) {}

  async execute({ id }: DeleteReviewCriteriaRequest) {
    const reviewCriteria = await this.reviewCriteriaRepository.findById(id);

    if (!reviewCriteria) {
      throw new NotFoundError(`Review Criteria with id ${id} not found`);
    }

    await this.reviewCriteriaRepository.delete(id);
  }
}
