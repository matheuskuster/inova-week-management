import { Entity } from '@/types/entities';
import { UniqueEntityId } from '@/types/value-objects';

export class ReviewCriteria extends Entity<ReviewCriteriaProps> {
  protected readonly props: ReviewCriteriaProps;

  constructor(props: ReviewCriteriaProps, id?: UniqueEntityId) {
    super(props, id);
    this.props = props;
  }

  public update(params: Partial<UpdateReviewCriteriaDTO>): void {
    this.props.question = params.question ?? this.props.question;
  }

  public get question(): string {
    return this.props.question;
  }

  public get inovaId(): string {
    return this.props.inovaId;
  }
}

export interface ReviewCriteriaProps {
  question: string;
  inovaId: string;
}

export interface UpdateReviewCriteriaDTO {
  question: string;
}
