import { Entity } from '@/types/entities';
import { Replace } from '@/types/ts-helpers';

export class Project extends Entity<MainProjectProps> {
  protected readonly props: ProjectProps;

  constructor(props: MainProjectProps) {
    super(props);
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  public update(params: Partial<UpdateProjectDTO>) {
    this.props.name = params.name ?? this.props.name;
    this.props.description = params.description ?? this.props.description;
    this.props.approved = params.approved ?? this.props.approved;
    this.props.leaderUserId = params.leaderUserId ?? this.props.leaderUserId;
    this.props.themeId = params.themeId ?? this.props.themeId;
    this.props.stand = params.stand ?? this.props.stand;
    this.props.presentationDay =
      params.presentationDay ?? this.props.presentationDay;

    if (Object.values(params).length > 0) {
      this.props.updatedAt = new Date();
    }
  }

  public get name(): string {
    return this.props.name;
  }

  public get description(): string {
    return this.props.description;
  }

  public get approved(): boolean {
    return this.props.approved;
  }

  public get leaderUserId(): string {
    return this.props.leaderUserId;
  }

  public get themeId(): string {
    return this.props.themeId;
  }

  public get inovaId(): string {
    return this.props.inovaId;
  }

  public get stand(): number | null {
    return this.props.stand ?? null;
  }

  public get presentationDay(): Date | null {
    return this.props.presentationDay ?? null;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }
}

export interface ProjectProps {
  name: string;
  description: string;
  approved: boolean;
  leaderUserId: string;
  themeId: string;
  inovaId: string;
  stand?: number;
  presentationDay?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateProjectDTO {
  name: string;
  description: string;
  approved: boolean;
  leaderUserId: string;
  themeId: string;
  stand?: number;
  presentationDay?: Date;
}

type MainProjectProps = Replace<
  ProjectProps,
  {
    createdAt?: Date;
    updatedAt?: Date;
  }
>;
