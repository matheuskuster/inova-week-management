import { makeReviewCriteria } from '@test/factories';
import { InMemoryReviewCriteriasRepository } from '@test/repositories/in-memory.review-criterias';

import { DeleteReviewCriteria } from './delete-review-criteria';

import { NotFoundError } from '@/errors/not-found.error';

describe('Delete Review Criteria', () => {
  let reviewCriteriaRepository: InMemoryReviewCriteriasRepository;
  let deleteReviewCriteria: DeleteReviewCriteria;

  beforeEach(() => {
    reviewCriteriaRepository = new InMemoryReviewCriteriasRepository();
    deleteReviewCriteria = new DeleteReviewCriteria(reviewCriteriaRepository);
  });

  it('should throw an error if review criteria does not exist', async () => {
    await expect(deleteReviewCriteria.execute({ id: 'invalid-id' })).rejects.toThrow(
      NotFoundError,
    );
  });

  it('should delete the review criteria if it exists', async () => {
    const reviewCriteria = makeReviewCriteria();
    await reviewCriteriaRepository.create(reviewCriteria);

    expect(await reviewCriteriaRepository.findById(reviewCriteria.id)).toEqual(reviewCriteria);

    await deleteReviewCriteria.execute({ id: reviewCriteria.id });

    const reviewsCriterias = await reviewCriteriaRepository.findAll();
    expect(reviewsCriterias).toEqual([]);
  });
});


