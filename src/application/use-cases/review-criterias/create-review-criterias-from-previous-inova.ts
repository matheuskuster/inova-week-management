import { Injectable } from '@nestjs/common';

import { ReviewCriteria } from '@/application/entities';
import {
  InovasRepository,
  ReviewsCriteriasRepository,
} from '@/application/repositories';
import { InvalidCredentialsError } from '@/errors/invalid-credentials.error';
import { NotFoundError } from '@/errors/not-found.error';

interface CreateReviewCriteriasFromPreviousInovaRequest {
  inovaId: string;
  previousInovaId: string;
}

interface CreateReviewCriteriasFromPreviousInovaResponse {
  reviewCriterias: ReviewCriteria[];
}

@Injectable()
export class CreateReviewCriteriasFromPreviousInova {
  constructor(
    private readonly reviewsCriteriasRepository: ReviewsCriteriasRepository,
    private readonly inovasRepository: InovasRepository,
  ) {}

  public async execute(
    request: CreateReviewCriteriasFromPreviousInovaRequest,
  ): Promise<CreateReviewCriteriasFromPreviousInovaResponse> {
    const inova = await this.inovasRepository.findById(request.inovaId);

    if (!inova) {
      throw new NotFoundError(
        `Inova with id [${request.inovaId}] was not found`,
      );
    }

    if (request.inovaId === request.previousInovaId) {
      throw new InvalidCredentialsError(
        `Inova with id [${request.inovaId}] is the same as previous inova id [${request.previousInovaId}]`,
      );
    }

    const previousInova = await this.inovasRepository.findById(
      request.previousInovaId,
    );

    if (!previousInova) {
      throw new NotFoundError(
        `Previous Inova with id [${request.previousInovaId}] was not found`,
      );
    }

    const previousReviewCriterias =
      await this.reviewsCriteriasRepository.findManyByInovaId(previousInova.id);

    if (previousReviewCriterias.length === 0) {
      throw new NotFoundError(
        `Review criterias from previous Inova with id [${request.previousInovaId}] were not found`,
      );
    }

    previousReviewCriterias.map(async (reviewCriteria) => {
      const newReviewCriteria = new ReviewCriteria({
        question: reviewCriteria.question,
        inovaId: request.inovaId,
      });

      await this.reviewsCriteriasRepository.create(newReviewCriteria);
    });

    return { reviewCriterias: previousReviewCriterias };
  }
}
