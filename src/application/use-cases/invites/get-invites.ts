import { Injectable } from '@nestjs/common';

import { Invite } from '@/application/entities';
import {
  InvitesRepository,
  ProjectsRepository,
} from '@/application/repositories';
import { NotFoundError } from '@/errors/not-found.error';
import { UnauthorizedError } from '@/errors/unauthorized-error';

interface GetInvitesRequest {
  projectId: string;
  userId: string;
}

interface GetInvitesResponse {
  invites: Invite[];
}

@Injectable()
export class GetInvites {
  constructor(
    private readonly invitesRepository: InvitesRepository,
    private readonly projectRepository: ProjectsRepository,
  ) {}

  public async execute({
    userId,
    projectId,
  }: GetInvitesRequest): Promise<GetInvitesResponse> {
    const foundProject = await this.projectRepository.findById(projectId);

    if (!foundProject) {
      throw new NotFoundError(`Project with id ${projectId} was not found`);
    }

    if (userId !== foundProject.leaderUserId) {
      throw new UnauthorizedError(
        `User with id [${userId}] is not the leader of project with id [${projectId}]`,
      );
    }

    const invites = await this.invitesRepository.findManyByProjectId(projectId);

    if (invites.length === 0) {
      throw new NotFoundError(`No invites were found`);
    }

    return { invites };
  }
}
