import { Injectable } from '@nestjs/common';

import { Invite } from '@/application/entities';
import {
  InvitesRepository,
  ProjectsRepository,
  UsersRepository,
} from '@/application/repositories';
import { NotFoundError } from '@/errors/not-found.error';
import { UnauthorizedError } from '@/errors/unauthorized-error';

interface CreateInviteRequest {
  userId: string;
  registration: string;
  projectId: string;
}

interface CreateInviteResponse {
  invite: Invite;
}

@Injectable()
export class CreateInvite {
  constructor(
    private readonly invitesRepository: InvitesRepository,
    private readonly projectsRepository: ProjectsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  public async execute({
    userId,
    registration,
    projectId,
  }: CreateInviteRequest): Promise<CreateInviteResponse> {
    const foundProject = await this.projectsRepository.findById(projectId);

    if (!foundProject) {
      throw new NotFoundError(`Project [${projectId}] not found`);
    }

    if (foundProject.leaderUserId !== userId) {
      throw new UnauthorizedError(
        `User [${userId}] is not the leader of project [${projectId}]`,
      );
    }

    const foundUser =
      await this.usersRepository.findByRegistration(registration);

    if (!foundUser) {
      throw new NotFoundError(`User with register [${registration}] not found`);
    }

    const invite = new Invite({
      userId: foundUser.id,
      projectId,
    });

    await this.invitesRepository.create(invite);

    return {
      invite,
    };
  }
}
