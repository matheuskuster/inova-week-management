import { Entity } from '@/types/entities';
import { Replace } from '@/types/ts-helpers';
import { UniqueEntityId } from '@/types/value-objects';

export class Event extends Entity<MainEventProps> {
  protected readonly props: EventProps;

  constructor(props: MainEventProps, id?: UniqueEntityId) {
    super(props, id);
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  public update(params: Partial<UpdateEventDTO>): void {
    this.props.name = params.name ?? this.props.name;
    this.props.description = params.description ?? this.props.description;
    this.props.type = params.type ?? this.props.type;
    this.props.date = params.date ?? this.props.date;

    if (Object.values(params).length > 0) {
      this.props.updatedAt = new Date();
    }
  }

  public get name(): string {
    return this.props.name;
  }

  public get description(): string | null {
    return this.props.description ?? null;
  }

  public get type(): string {
    return this.props.type;
  }

  public get date(): Date {
    return this.props.date;
  }

  public get inovaId(): string {
    return this.props.inovaId;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }
}

export interface EventProps {
  name: string;
  description?: string;
  type: string;
  date: Date;
  inovaId: string;
  createdAt: Date;
  updatedAt: Date;
}

type MainEventProps = Replace<
  EventProps,
  {
    createdAt?: Date;
    updatedAt?: Date;
  }
>;

export interface UpdateEventDTO {
  name: string;
  description: string;
  type: string;
  date: Date;
}
