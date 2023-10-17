import { Entity } from '@/types/entities';
import { UniqueEntityId } from '@/types/value-objects';

export class Role extends Entity<RoleProps> {
  protected readonly props: RoleProps;

  constructor(props: RoleProps, id?: UniqueEntityId) {
    super(props, id);
    this.props = props;
  }

  public get name(): string {
    return this.props.name;
  }

  public get description(): string | null {
    return this.props.description ?? null;
  }

  public update(params: Partial<RoleProps>) {
    this.props.name = params.name ?? this.props.name;
    this.props.description = params.description ?? this.props.description;
  }
}

export interface RoleProps {
  name: string;
  description?: string;
}
