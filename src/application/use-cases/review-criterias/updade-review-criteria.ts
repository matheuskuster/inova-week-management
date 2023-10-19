import { ReviewsCriteriasRepository } from "@/application/repositories";
import { NotFoundError } from "@/errors/not-found.error";

interface UpdateReviewCriteriaRequest {
  id: string;
  question?: string;
  inovaId?: string;
}

export class UpdateReviewCriteria {
    constructor(
        private readonly reviewCriteriaRepository: ReviewsCriteriasRepository,
    ) {}

    async execute(request: UpdateReviewCriteriaRequest) {
        const reviewCriteria = await this.reviewCriteriaRepository.findById(request.id);

        if (!reviewCriteria) {
            throw new NotFoundError(`Review Criteria with id ${request.id} not found`);
        }

        reviewCriteria.update({
            question: request.question,
        });

        await this.reviewCriteriaRepository.save(reviewCriteria);

        return {
            reviewCriteria,
        };
    }
}