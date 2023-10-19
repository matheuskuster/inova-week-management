import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Put } from '@nestjs/common';

import { Roles } from '../decorators';
import { ReviewCriteriaViewModel } from '../view-models/review-criteria.view-model';

import { GetReviewCriteriaById } from '@/application/use-cases/review-criterias/get-review-criteria-by-id';
import { DeleteReviewCriteria } from '@/application/use-cases/review-criterias/delete-review-criteria';
import { UpdateReviewCriteria } from '@/application/use-cases/review-criterias/updade-review-criteria';

@Controller('review-criterias')
export class ReviewCriteriasController {
  constructor(
    private readonly getReviewCriteriaById: GetReviewCriteriaById,
    private readonly updateReviewCriteriaById: UpdateReviewCriteria,
    private readonly deleteReviewCriteriaById: DeleteReviewCriteria,
    ) {}

  @Roles('admin','professor','student')
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  async findById(@Param('id') id: string) {
    const { reviewCriteria } = await this.getReviewCriteriaById.execute({ id });

    return {
      reviewCriteria: ReviewCriteriaViewModel.toHTTP(reviewCriteria),
    };
  }

  @Roles('admin')
  @HttpCode(HttpStatus.OK)
  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() body: GetReviewCriteriaById
    ) {
    const { reviewCriteria } = await this.updateReviewCriteriaById.execute({ id, ...body });

    return {
      reviewCriteria: ReviewCriteriaViewModel.toHTTP(reviewCriteria),
    };

  }

  @Roles('admin')
  @HttpCode(HttpStatus.OK)
  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.deleteReviewCriteriaById.execute({ id });
  }
}
