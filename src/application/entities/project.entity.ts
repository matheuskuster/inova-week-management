import { Entity } from '@/types/entities';
import { Replace } from '@/types/ts-helpers';
import { UniqueEntityId } from '@/types/value-objects';

export class Project extends Entity<MainProjectProps> {
  protected readonly props: ProjectProps;

  constructor(props: MainProjectProps, id?: UniqueEntityId) {
    super(props, id);
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  public update(params: Partial<UpdateProjectDTO>) {
    this.props.name = params.name ?? this.props.name;
    this.props.description = params.description ?? this.props.description;
    this.props.leaderUserId = params.leaderUserId ?? this.props.leaderUserId;
    this.props.themeId = params.themeId ?? this.props.themeId;

    if (Object.values(params).length > 0) {
      this.props.updatedAt = new Date();
    }
  }

  public setPresentation(params: { stand: number; presentationDay: Date }) {
    this.props.stand = params.stand;
    this.props.presentationDay = params.presentationDay;
    this.props.updatedAt = new Date();
  }

  public setApproval(approved: boolean) {
    this.props.approved = approved;
    this.props.reviewedAt = new Date();
    this.props.updatedAt = new Date();
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

  public get reviewedAt(): Date | null {
    return this.props.reviewedAt ?? null;
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
  reviewedAt?: Date;
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
