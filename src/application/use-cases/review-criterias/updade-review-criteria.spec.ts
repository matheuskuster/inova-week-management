import { makeReviewCriteria } from '@test/factories';
import { InMemoryReviewCriteriasRepository } from '@test/repositories/in-memory.review-criterias.repository';

import { UpdateReviewCriteria } from './updade-review-criteria';

describe('Update Review Criteria', () => {
  let reviewCriteriaRepository: InMemoryReviewCriteriasRepository;
  let updateReviewCriteria: UpdateReviewCriteria;

  beforeEach(() => {
    reviewCriteriaRepository = new InMemoryReviewCriteriasRepository();
    updateReviewCriteria = new UpdateReviewCriteria(reviewCriteriaRepository);
  });

  it('should throw an error if review criteria does not exist', async () => {
    await expect(
      updateReviewCriteria.execute({ id: 'invalid-id' }),
    ).rejects.toThrow();
  });

  it('should update the review criteria if it exists', async () => {
    const reviewCriteria = makeReviewCriteria();
    await reviewCriteriaRepository.create(reviewCriteria);

    expect(await reviewCriteriaRepository.findById(reviewCriteria.id)).toEqual(
      reviewCriteria,
    );

    await updateReviewCriteria.execute({
      id: reviewCriteria.id,
      question: 'new-question',
    });

    const updatedReviewCriteria = await reviewCriteriaRepository.findById(
      reviewCriteria.id,
    );
    expect(updatedReviewCriteria?.question).toEqual('new-question');
  });
});
