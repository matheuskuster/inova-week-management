import { Injectable } from '@nestjs/common';

import { Project } from '@/application/entities';
import {
  ThemesRepository,
  InovasRepository,
  ProjectsRepository,
  InvitesRepository,
} from '@/application/repositories';
import { NotFoundError } from '@/errors/not-found.error';
import { UnauthorizedError } from '@/errors/unauthorized-error';

interface CreateProjectRequest {
  userId: string;
  name: string;
  description: string;
  themeId: string;
  inovaId: string;
}

interface CreateProjectResponse {
  project: Project;
}

@Injectable()
export class CreateProject {
  constructor(
    private readonly projectsRepository: ProjectsRepository,
    private readonly inovasRepository: InovasRepository,
    private readonly themesRepository: ThemesRepository,
    private readonly invitesRepository: InvitesRepository,
  ) {}

  public async execute(
    request: CreateProjectRequest,
  ): Promise<CreateProjectResponse> {
    const inova = await this.inovasRepository.findById(request.inovaId);

    if (!inova) {
      throw new NotFoundError(
        `Inova with id [${request.inovaId}] was not found`,
      );
    }

    const theme = await this.themesRepository.findById(request.themeId);

    if (!theme) {
      throw new NotFoundError(
        `Theme with id [${request.themeId}] was not found`,
      );
    }

    if (theme.inovaId !== inova.id) {
      throw new UnauthorizedError(
        `Theme with id [${theme.id}] does not belong to Inova with id [${inova.id}]`,
      );
    }

    const invites = await this.invitesRepository.findAll();

    const hasUserAProject = invites.some(
      (invite) => invite.userId === request.userId && invite.isAccepted,
    );

    if (hasUserAProject) {
      throw new UnauthorizedError(
        `User with id [${request.userId}] was already belongs to a project`,
      );
    }

    const project = new Project({
      name: request.name,
      description: request.description,
      approved: false,
      leaderUserId: request.userId,
      themeId: request.themeId,
      inovaId: request.inovaId,
    });

    await this.projectsRepository.create(project);

    return {
      project,
    };
  }
}
