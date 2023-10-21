import { makeInova } from '@test/factories/inova.factory';
import {
  InMemoryInovasRepository,
  InMemoryReviewCriteriasRepository,
} from '@test/repositories';

import { CreateReviewCriteria } from './create-review-criteria';

import { NotFoundError } from '@/errors/not-found.error';

describe('Create Review Criteria', () => {
  let reviewsCriteriasRepository: InMemoryReviewCriteriasRepository;
  let inovasRepository: InMemoryInovasRepository;
  let createReviewCriteria: CreateReviewCriteria;

  beforeEach(() => {
    reviewsCriteriasRepository = new InMemoryReviewCriteriasRepository();
    inovasRepository = new InMemoryInovasRepository();

    createReviewCriteria = new CreateReviewCriteria(
      reviewsCriteriasRepository,
      inovasRepository,
    );
  });

  it('should be defined', async () => {
    expect(createReviewCriteria).toBeDefined();
  });

  it('should throw if inova does not exist', async () => {
    await expect(
      createReviewCriteria.execute({
        inovaId: 'inova-id',
        question: 'any_question',
      }),
    ).rejects.toThrow(NotFoundError);
  });

  it('should be able to create a new Review Criteria', async () => {
    const inova = makeInova();
    await inovasRepository.create(inova);

    const { reviewCriteria } = await createReviewCriteria.execute({
      inovaId: inova.id,
      question: 'any_question',
    });

    expect(reviewCriteria).toBeDefined();
    expect(reviewCriteria.question).toBe('any_question');
    expect(reviewCriteria.inovaId).toBe(inova.id);
  });
});
