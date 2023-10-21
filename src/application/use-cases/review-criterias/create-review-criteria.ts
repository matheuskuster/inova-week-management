import { Injectable } from '@nestjs/common';

import { ReviewCriteria } from '@/application/entities';
import {
  InovasRepository,
  ReviewsCriteriasRepository,
} from '@/application/repositories';
import { NotFoundError } from '@/errors/not-found.error';

interface CreateReviewCriteriaRequest {
  inovaId: string;
  question: string;
}

interface CreateReviewCriteriaResponse {
  reviewCriteria: ReviewCriteria;
}

@Injectable()
export class CreateReviewCriteria {
  constructor(
    private readonly reviewsCriteriasRepository: ReviewsCriteriasRepository,
    private readonly inovasRepository: InovasRepository,
  ) {}

  public async execute(
    request: CreateReviewCriteriaRequest,
  ): Promise<CreateReviewCriteriaResponse> {
    const inova = await this.inovasRepository.findById(request.inovaId);

    if (!inova) {
      throw new NotFoundError(
        `Inova with id [${request.inovaId}] was not found`,
      );
    }

    const reviewCriteria = new ReviewCriteria({
      question: request.question,
      inovaId: request.inovaId,
    });

    await this.reviewsCriteriasRepository.create(reviewCriteria);

    return {
      reviewCriteria,
    };
  }
}
