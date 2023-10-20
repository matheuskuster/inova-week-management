import { Entity } from '@/types/entities';
import { Replace } from '@/types/ts-helpers';
import { UniqueEntityId } from '@/types/value-objects';

export class Theme extends Entity<MainThemeProps> {
  protected readonly props: ThemeProps;

  constructor(props: MainThemeProps, id?: UniqueEntityId) {
    super(props, id);
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  public update(params: Partial<UpdateThemeDTO>): void {
    this.props.name = params.name ?? this.props.name;
    this.props.description = params.description ?? this.props.description;
    this.props.inovaId = params.inovaId ?? this.props.inovaId;
  }

  public get name(): string {
    return this.props.name;
  }

  public get description(): string | null {
    return this.props.description ?? null;
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

export interface ThemeProps {
  name: string;
  description?: string;
  inovaId: string;
  createdAt: Date;
  updatedAt: Date;
}

type MainThemeProps = Replace<
  ThemeProps,
  {
    createdAt?: Date;
    updatedAt?: Date;
  }
>;

export interface UpdateThemeDTO {
  name: string;
  description: string;
  inovaId: string;
}
