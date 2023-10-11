import { Entity } from '@/types/entities';
import { Replace } from '@/types/ts-helpers';

export class ReviewAnswer extends Entity<MainReviewAnswerProps> {
  protected readonly props: ReviewAnswerProps;

  constructor(props: MainReviewAnswerProps) {
    super(props);
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get reviewId(): string {
    return this.props.reviewId;
  }

  public get criteriaId(): string {
    return this.props.criteriaId;
  }

  public set value(value: number) {
    this.props.value = value;
  }

  public get value(): number {
    return this.props.value;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
}

export interface ReviewAnswerProps {
  reviewId: string;
  criteriaId: string;
  value: number;
  createdAt: Date;
}

type MainReviewAnswerProps = Replace<
  ReviewAnswerProps,
  {
    createdAt?: Date;
  }
>;
