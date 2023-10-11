import { Entity } from '@/types/entities';
import { Replace } from '@/types/ts-helpers';
import { UniqueEntityId } from '@/types/value-objects';

export class Inova extends Entity<MainInovaProps> {
  protected readonly props: InovaProps;

  constructor(props: MainInovaProps, id?: UniqueEntityId) {
    super(props, id);
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  public update(params: Partial<UpdateInovaDTO>): void {
    this.props.name = params.name ?? this.props.name;
    this.props.description = params.description ?? this.props.description;
    this.props.from = params.from ?? this.props.from;
    this.props.to = params.to ?? this.props.to;
    this.props.year = params.year ?? this.props.year;

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

  public get from(): Date {
    return this.props.from;
  }

  public get to(): Date {
    return this.props.to;
  }

  public get year(): number {
    return this.props.year;
  }
}

export interface InovaProps {
  name: string;
  description?: string;
  from: Date;
  to: Date;
  year: number;
  createdAt: Date;
  updatedAt: Date;
}

type MainInovaProps = Replace<
  InovaProps,
  {
    createdAt?: Date;
    updatedAt?: Date;
  }
>;

export interface UpdateInovaDTO {
  name: string;
  description: string;
  from: Date;
  to: Date;
  year: number;
}
