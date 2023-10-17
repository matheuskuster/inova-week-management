import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';

import { Roles } from '../decorators';
import { ReviewCriteriaViewModel } from '../view-models/review-criteria.view-model';

import { GetReviewCriteriaById } from '@/application/use-cases/get-review-criteria-by-id';

@Controller('review-criterias')
export class ReviewCriteriasController {
  constructor(private readonly getReviewCriteriaById: GetReviewCriteriaById) {}

  @Roles('admin','professor','student')
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  async findById(@Param('id') id: string) {
    const { reviewCriteria } = await this.getReviewCriteriaById.execute({ id });

    return {
      reviewCriteria: ReviewCriteriaViewModel.toHTTP(reviewCriteria),
    };
  }
}
