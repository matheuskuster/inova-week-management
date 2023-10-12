import { Entity } from './entity';
import { UniqueEntityId } from '../value-objects';

export class AuthenticatedUser extends Entity<AuthenticatedUserProps> {
  public readonly props: AuthenticatedUserProps;

  constructor(props: AuthenticatedUserProps, id: UniqueEntityId) {
    super(props, id);
    this.props = props;
  }

  public get name(): string {
    return this.props.name;
  }

  public get email(): string {
    return this.props.email;
  }

  public get roles(): string[] {
    return this.props.roles;
  }

  public get registration(): string {
    return this.props.registration;
  }

  public toJSON(): AuthenticatedUserJSON {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      roles: this.roles,
      registration: this.props.registration,
    };
  }
}

export interface AuthenticatedUserProps {
  name: string;
  email: string;
  roles: string[];
  registration: string;
}

interface AuthenticatedUserJSON extends AuthenticatedUserProps {
  id: string;
}
