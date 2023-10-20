import { Entity } from '@/types/entities';
import { UniqueEntityId } from '@/types/value-objects';

export class Theme extends Entity<ThemeProps> {
  protected readonly props: ThemeProps;

  constructor(props: ThemeProps, id?: UniqueEntityId) {
    super(props, id);
    this.props = props;
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
}

export interface ThemeProps {
  name: string;
  description?: string;
  inovaId: string;
}

export interface UpdateThemeDTO {
  name: string;
  description: string;
  inovaId: string;
}
