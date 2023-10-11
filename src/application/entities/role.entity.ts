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
}

export interface RoleProps {
  name: string;
  description?: string;
}
