import { Role } from './role.entity';

import { Entity } from '@/types/entities';
import { Replace } from '@/types/ts-helpers';
import { UniqueEntityId } from '@/types/value-objects';

export class User extends Entity<MainUserProps> {
  protected readonly props: UserProps;

  constructor(props: MainUserProps, id?: UniqueEntityId) {
    super(props, id);
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  public update(params: Partial<MainUserProps>): void {
    this.props.name = params.name ?? this.props.name;
    this.props.phone = params.phone ?? this.props.phone;
    this.props.registration = params.registration ?? this.props.registration;
    this.props.email = params.email ?? this.props.email;
    this.props.passwordHash = params.passwordHash ?? this.props.passwordHash;
    this.props.birthDate = params.birthDate ?? this.props.birthDate;

    if (Object.values(params).length > 0) {
      this.props.updatedAt = new Date();
    }
  }

  public get name(): string {
    return this.props.name;
  }

  public get phone(): string {
    return this.props.phone;
  }

  public get registration(): string {
    return this.props.registration;
  }

  public get email(): string {
    return this.props.email;
  }

  public get passwordHash(): string {
    return this.props.passwordHash;
  }

  public get birthDate(): Date {
    return this.props.birthDate;
  }

  public get roles(): Role[] {
    return this.props.roles;
  }
}

export interface UserProps {
  name: string;
  phone: string;
  registration: string;
  email: string;
  passwordHash: string;
  birthDate: Date;
  roles: Role[];
  createdAt: Date;
  updatedAt: Date;
}

export type MainUserProps = Replace<
  UserProps,
  {
    createdAt?: Date;
    updatedAt?: Date;
  }
>;
