import { makeReviewCriteria } from '@test/factories';
import { makeInova } from '@test/factories/inova.factory';
import {
  InMemoryInovasRepository,
  InMemoryReviewCriteriasRepository,
} from '@test/repositories';

import { FetchReviewCriteriasFromInova } from './fetch-review-criterias-from-inova';

import { NotFoundError } from '@/errors/not-found.error';

describe('Fetch Review Criterias from Inova', () => {
  let reviewCriteriasRepository: InMemoryReviewCriteriasRepository;
  let inovasRepository: InMemoryInovasRepository;
  let fetchReviewCriteriasFromInova: FetchReviewCriteriasFromInova;

  beforeEach(() => {
    reviewCriteriasRepository = new InMemoryReviewCriteriasRepository();
    inovasRepository = new InMemoryInovasRepository();

    fetchReviewCriteriasFromInova = new FetchReviewCriteriasFromInova(
      reviewCriteriasRepository,
      inovasRepository,
    );
  });

  it('should be defined', async () => {
    expect(fetchReviewCriteriasFromInova).toBeDefined();
  });

  it('should throw if inova was not found', async () => {
    const inovaId = 'inova-id';

    await expect(
      fetchReviewCriteriasFromInova.execute({ inovaId }),
    ).rejects.toBeInstanceOf(NotFoundError);
  });

  it('should throw if no review criterias were found', async () => {
    const inovaInMemory = makeInova();

    await inovasRepository.create(inovaInMemory);

    await expect(
      fetchReviewCriteriasFromInova.execute({ inovaId: inovaInMemory.id }),
    ).rejects.toBeInstanceOf(NotFoundError);
  });

  it('should be able to return all review criterias from an inova', async () => {
    const inovaInMemory = makeInova();
    const reviewCriteriasInMemory = [
      makeReviewCriteria({
        inovaId: inovaInMemory.id,
        question: 'mockquestion1',
      }),
      makeReviewCriteria({
        inovaId: inovaInMemory.id,
        question: 'mockquestion2',
      }),
    ];

    await inovasRepository.create(inovaInMemory);
    await reviewCriteriasRepository.create(reviewCriteriasInMemory[0]);
    await reviewCriteriasRepository.create(reviewCriteriasInMemory[1]);

    const { reviewCriterias } = await fetchReviewCriteriasFromInova.execute({
      inovaId: inovaInMemory.id,
    });

    expect(reviewCriterias).toHaveLength(2);
    expect(reviewCriterias[0].id).toBe(reviewCriteriasInMemory[0].id);
    expect(reviewCriterias[0].question).toBe(
      reviewCriteriasInMemory[0].question,
    );
    expect(reviewCriterias[0].inovaId).toBe(inovaInMemory.id);
    expect(reviewCriterias[1].id).toBe(reviewCriteriasInMemory[1].id);
    expect(reviewCriterias[1].question).toBe(
      reviewCriteriasInMemory[1].question,
    );
    expect(reviewCriterias[1].inovaId).toBe(inovaInMemory.id);
  });
});
