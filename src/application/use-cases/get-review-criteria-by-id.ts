import { ReviewsCriteriasRepository } from '../repositories';
import { Injectable } from '@nestjs/common';

import { NotFoundError } from '@/errors/not-found.error';

interface GetReviewCriteriaByIdRequest {
  id: string;
}

@Injectable()
export class GetReviewCriteriaById {
  constructor(private readonly reviewCriteriaRepository: ReviewsCriteriasRepository) {}

  async execute(request: GetReviewCriteriaByIdRequest) {
    
    const foundReviewCriteria = await this.reviewCriteriaRepository.findById(request.id);

    if (!foundReviewCriteria) {
      throw new NotFoundError(`Review-Criteria with id ${request.id} not found`);
    }

    return {
      reviewCriteria: foundReviewCriteria,
    };
  }
}
