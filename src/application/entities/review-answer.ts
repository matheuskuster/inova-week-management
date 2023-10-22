import { Entity } from '@/types/entities';
import { Replace } from '@/types/ts-helpers';
import { UniqueEntityId } from '@/types/value-objects';

export class ReviewAnswer extends Entity<MainReviewAnswerProps> {
  protected readonly props: ReviewAnswerProps;

  constructor(props: MainReviewAnswerProps, id?: UniqueEntityId) {
    super(props);
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
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

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }
}

export interface ReviewAnswerProps {
  reviewId: string;
  criteriaId: string;
  value: number;
  createdAt: Date;
  updatedAt: Date;
}

type MainReviewAnswerProps = Replace<
  ReviewAnswerProps,
  {
    createdAt?: Date;
    updatedAt?: Date;
  }
>;
