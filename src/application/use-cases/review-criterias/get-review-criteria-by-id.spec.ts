import { makeReviewCriteria } from '@test/factories/review-criteria.factory';
import { InMemoryReviewCriteriasRepository } from '@test/repositories/in-memory.review-criterias';

import { GetReviewCriteriaById } from './get-review-criteria-by-id';

import { NotFoundError } from '@/errors/not-found.error';

describe('Get Review Criteria By Id', () => {
  let reviewCriteriaRepository: InMemoryReviewCriteriasRepository;
  let getReviewCriteriaById: GetReviewCriteriaById;

  beforeEach(() => {
    reviewCriteriaRepository = new InMemoryReviewCriteriasRepository();
    getReviewCriteriaById = new GetReviewCriteriaById(reviewCriteriaRepository);
  });

  it('should throw an error if review criteria does not exist', async () => {
    await expect(getReviewCriteriaById.execute({ id: 'invalid-id' })).rejects.toThrow(
      NotFoundError,
    );
  });

  it('should return the review criteria if it exists', async () => {
    const reviewCriteria = makeReviewCriteria();
    await reviewCriteriaRepository.create(reviewCriteria);

    const response = await getReviewCriteriaById.execute({ id: reviewCriteria.id });
    expect(response.reviewCriteria.id).toBe(reviewCriteria.id);
  });
});
