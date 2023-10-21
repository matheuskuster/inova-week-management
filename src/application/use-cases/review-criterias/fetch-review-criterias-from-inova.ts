import { Injectable } from '@nestjs/common';

import { ReviewCriteria } from '@/application/entities';
import {
  InovasRepository,
  ReviewsCriteriasRepository,
} from '@/application/repositories';
import { NotFoundError } from '@/errors/not-found.error';

interface FetchReviewCriteriasFromInovaRequest {
  inovaId: string;
}

interface FetchReviewCriteriasFromInovaResponse {
  reviewCriterias: ReviewCriteria[];
}

@Injectable()
export class FetchReviewCriteriasFromInova {
  constructor(
    private readonly reviewsCriteriasRepository: ReviewsCriteriasRepository,
    private readonly inovasRepository: InovasRepository,
  ) {}

  async execute(
    request: FetchReviewCriteriasFromInovaRequest,
  ): Promise<FetchReviewCriteriasFromInovaResponse> {
    const foundInova = await this.inovasRepository.findById(request.inovaId);

    if (!foundInova) {
      throw new NotFoundError(
        `Inova with id [${request.inovaId}] was not found`,
      );
    }

    const reviewCriterias =
      await this.reviewsCriteriasRepository.findManyByInovaId(request.inovaId);

    if (reviewCriterias.length === 0) {
      throw new NotFoundError(
        `No review criterias from inova [${request.inovaId}] were found`,
      );
    }

    return {
      reviewCriterias,
    };
  }
}
