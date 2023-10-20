import { Entity } from '@/types/entities';
import { Replace } from '@/types/ts-helpers';
import { UniqueEntityId } from '@/types/value-objects';

export class Invite extends Entity<MainInviteProps> {
  protected readonly props: InviteProps;

  constructor(props: MainInviteProps, id?: UniqueEntityId) {
    super(props, id);
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  public accept() {
    this.props.acceptedAt = new Date();
  }

  public get userId(): string {
    return this.props.userId;
  }

  public get projectId(): string {
    return this.props.projectId;
  }

  public get acceptedAt(): Date | null {
    return this.props.acceptedAt ?? null;
  }

  public get isAccepted(): boolean {
    return !!this.props.acceptedAt;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }
}

export interface InviteProps {
  userId: string;
  projectId: string;
  acceptedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

type MainInviteProps = Replace<
  InviteProps,
  {
    createdAt?: Date;
    updatedAt?: Date;
  }
>;
