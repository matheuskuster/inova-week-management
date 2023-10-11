import { Entity } from '@/types/entities';
import { UniqueEntityId } from '@/types/value-objects';

export class Theme extends Entity<ThemeProps> {
  protected readonly props: ThemeProps;

  constructor(props: ThemeProps, id?: UniqueEntityId) {
    super(props, id);
    this.props = props;
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
