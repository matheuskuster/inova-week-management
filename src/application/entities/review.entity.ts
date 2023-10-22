import { Entity } from '@/types/entities';
import { Replace } from '@/types/ts-helpers';
import { UniqueEntityId } from '@/types/value-objects';

export class Review extends Entity<MainReviewProps> {
  protected readonly props: ReviewProps;

  constructor(props: MainReviewProps, id?: UniqueEntityId) {
    super(props, id);
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  public get userId(): string {
    return this.props.userId;
  }

  public get projectId(): string {
    return this.props.projectId;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }
}

export interface ReviewProps {
  userId: string;
  projectId: string;
  createdAt: Date;
  updatedAt: Date;
}

type MainReviewProps = Replace<
  ReviewProps,
  {
    createdAt?: Date;
    updatedAt?: Date;
  }
>;
