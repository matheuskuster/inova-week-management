import { Entity } from '@/types/entities';
import { Replace } from '@/types/ts-helpers';
import { UniqueEntityId } from '@/types/value-objects';

export class Attendance extends Entity<MainAttendanceProps> {
  protected readonly props: AttendanceProps;

  constructor(props: MainAttendanceProps, id?: UniqueEntityId) {
    super(props, id);
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  public get userId(): string {
    return this.props.userId;
  }

  public get eventId(): string {
    return this.props.eventId;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }
}

export interface AttendanceProps {
  userId: string;
  eventId: string;
  createdAt: Date;
  updatedAt: Date;
}

type MainAttendanceProps = Replace<
  AttendanceProps,
  {
    createdAt?: Date;
    updatedAt?: Date;
  }
>;
