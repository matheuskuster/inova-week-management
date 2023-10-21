import { makeReviewCriteria } from '@test/factories';
import { makeInova } from '@test/factories/inova.factory';
import {
  InMemoryInovasRepository,
  InMemoryReviewCriteriasRepository,
} from '@test/repositories';

import { CreateReviewCriteriasFromPreviousInova } from './create-review-criterias-from-previous-inova';

import { InvalidCredentialsError } from '@/errors/invalid-credentials.error';
import { NotFoundError } from '@/errors/not-found.error';

describe('Create Theme', () => {
  let reviewCriteriasRepository: InMemoryReviewCriteriasRepository;
  let inovasRepository: InMemoryInovasRepository;
  let createReviewCriteriasFromPreviousInova: CreateReviewCriteriasFromPreviousInova;

  beforeEach(() => {
    reviewCriteriasRepository = new InMemoryReviewCriteriasRepository();
    inovasRepository = new InMemoryInovasRepository();

    createReviewCriteriasFromPreviousInova =
      new CreateReviewCriteriasFromPreviousInova(
        reviewCriteriasRepository,
        inovasRepository,
      );
  });

  it('should be defined', async () => {
    expect(createReviewCriteriasFromPreviousInova).toBeDefined();
  });

  it('should throw if inova does not exist', async () => {
    await expect(
      createReviewCriteriasFromPreviousInova.execute({
        inovaId: 'inova-id',
        previousInovaId: 'previous-inova-id',
      }),
    ).rejects.toThrow(NotFoundError);
  });

  it('should throw if inova id is the same as previous inova id', async () => {
    const inova = makeInova();
    await inovasRepository.create(inova);

    await expect(
      createReviewCriteriasFromPreviousInova.execute({
        inovaId: inova.id,
        previousInovaId: inova.id,
      }),
    ).rejects.toThrow(InvalidCredentialsError);
  });

  it('should throw if previous inova does not exist', async () => {
    const inova = makeInova();
    await inovasRepository.create(inova);

    await expect(
      createReviewCriteriasFromPreviousInova.execute({
        inovaId: inova.id,
        previousInovaId: 'previous-inova-id',
      }),
    ).rejects.toThrow(NotFoundError);
  });

  it('should throw if previous inova has no review criterias', async () => {
    const inova = makeInova();
    await inovasRepository.create(inova);

    const previousInova = makeInova();
    await inovasRepository.create(previousInova);

    await expect(
      createReviewCriteriasFromPreviousInova.execute({
        inovaId: inova.id,
        previousInovaId: previousInova.id,
      }),
    ).rejects.toThrow(NotFoundError);
  });

  it('should be able to create new review criterias from previous inova', async () => {
    const inova = makeInova();
    await inovasRepository.create(inova);

    const previousInova = makeInova();
    await inovasRepository.create(previousInova);

    const reviewCriteriasInMemory = [
      makeReviewCriteria({ inovaId: previousInova.id }),
      makeReviewCriteria({ inovaId: previousInova.id }),
    ];

    await reviewCriteriasRepository.create(reviewCriteriasInMemory[0]);
    await reviewCriteriasRepository.create(reviewCriteriasInMemory[1]);

    const { reviewCriterias } =
      await createReviewCriteriasFromPreviousInova.execute({
        inovaId: inova.id,
        previousInovaId: previousInova.id,
      });

    expect(reviewCriterias.length).toBe(reviewCriteriasInMemory.length);
  });
});
